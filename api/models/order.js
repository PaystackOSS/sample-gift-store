const mongoose = require('mongoose');
require('./gift');
const Gift = mongoose.model('gift')
const orderSchema = new mongoose.Schema({
    email: String,
    address: String,
    gifts: [Gift.schema],
    reference: {
        type: String,
        unique: true,
        required: true 
      },
    status: String,
    createdAt: Date,
    updatedAt: Date,
    amount: Number
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order ;