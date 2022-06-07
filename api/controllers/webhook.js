const crypto = require('crypto');
const secret = process.env.PAYSTACK_SECRET_KEY;
const mongoose = require('mongoose');
require('../lib/DB');
require('../models/order');

const webhook = async function (req, res, next) {
    try {
        const signature = req.headers['x-paystack-signature'];
        const body = JSON.stringify(req.body);
        const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');
        if (hash === signature) {
            const Order = mongoose.model('order');
            const order = await Order.findOne({ reference: req.body.data.reference });
            if (order) {
                if (req.body.event === 'charge.success') {
                    order.status = 'paid';
                    order.updatedAt = new Date();
                    await order.save();
                    return res.json({ status: true, message: "Order placed successfully!" });
                } else if (req.body.event === 'refund.processed') {
                    order.status = 'refunded';
                    order.updatedAt = new Date();
                    await order.save();
                    return res.json({ status: true, message: "Order refunded successfully!" });
                } else if (req.body.event === 'refund.failed') {
                    order.status = 'paid';
                    order.updatedAt = new Date();
                    await order.save();
                   return res.status(400).json({ status: false, message: 'Transaction failed.' });
                }
            }

            else {
                let eventData = req.body.data;
                if (req.body.event === "charge.success") {
                    const order = new Order({
                        email: eventData.customer.email,
                        address: eventData.metadata.address,
                        gifts: eventData.metadata.gifts,
                        reference: eventData.reference,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        status: 'paid'
                    });
                    await order.save();
                    return res.json({ status: true, message: "Order placed successfully!" });
                }
            }

        }
        return res.status(400).json({ message: 'Invalid signature.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = webhook;