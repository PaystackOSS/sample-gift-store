const axios = require('axios');
const mongoose = require('mongoose');
require('../lib/DB')
require('../models/order');
const refund = async function (req, res, next) {
    if (!req.body.reference) {
        return res.status(400).json({ message: 'Please provide a reference.' });
    }
    if (!req.body.amount) {
        return res.status(400).json({ message: 'Please provide a refund amount.' });
    }
    const url = `https://api.paystack.co/refund`;
    let refundData = {
        transaction: req.body.reference,
        amount: req.body.amount * 100,
        merchant_note: 'Refund for order',
        customer_note: 'Refund for order'
    }
    console.log(refundData);
    axios.post(url, refundData, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }).then(async (response) => {
        console.log(response.data)
        if(response.data.data.status === 'pending' || response.data.data.status === 'success'){
            const Order = mongoose.model('order');
            const order = await Order.findOne({ reference: req.body.reference });
            order.status = 'refunded';
            const savedOrder = await order.save();
            res.json({ status: true, message: "Order refunded successfully!", gifts: savedOrder });
        }else{
            res.json({status: true, message:"Refund is processing"})
        }
    }).catch((err) =>{
        console.log(err);
        return res.status(400).json({ status: false, message: 'Refund failed.', error: err.response.data.message || JSON.stringify(err)});
    })

}

module.exports = refund;