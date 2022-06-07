
const mongoose = require('mongoose');
require('../lib/DB')
require('../models/order');
require('../models/gift');
const axios = require('axios');

const create = async function (req, res, next) {
  const { email, address, gifts, reference } = req.body;
  if (!email || !address || !gifts || !reference) {
    return res.status(400).json({ message: 'Please provide all the required fields.' });
  }
  try {
    axios.get(`https://api.paystack.co/transaction/verify/${req.body.reference}`, { //Verify transaction
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    })
      .then(async (response) => {

        const Order = mongoose.model('order');
        const order = new Order({
          email: req.body.email,
          address: req.body.address,
          gifts: req.body.gifts,
          reference: req.body.reference,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        if (response.data.data.status === 'success') {
          order.status = 'paid';
          order.amount = response.data.data.amount/100;
          const savedOrder = await order.save();
          res.json({ status: true, message: "Order placed successfully!", order: savedOrder });
        } else {
          order.status = 'abandoned';
          order.amount = response.data.data.amount/100;
          const savedOrder = await order.save();
          res.status(400).json({ status: false, message: 'Transaction failed.', order: savedOrder });
        }
      }).catch(error => {
        console.log('error', error)
        if(error.response){
          return res.status(400).json({ status: false, message: 'Transaction failed.', error: error.response.data.message || JSON.stringify(error) });
        }
        return res.status(400).json({ status: false, message: 'Transaction failed.', error });
      });
  }
  catch (e) {
    console.trace()
    console.error(e);
  }
}

const fetch = async function (req, res, next) {
  try {
    const Order = mongoose.model('order');
    Order.find({}).sort({updatedAt: -1}).then((orders) => {
      res.json({ status: true, orders: orders });
    }).catch((err) => {
      res.status(500).json({ status: false, message: 'Error fetching orders.', error: err });
      console.log('err', err)
    });

  }
  catch (e) {
    console.error(e);
  }
}

module.exports = {
  create,
  fetch
}