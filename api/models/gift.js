const mongoose = require('mongoose');
const giftSchema = new mongoose.Schema({
    name: String,
    size: Number,
    price: Number,
    sendor: String,
    quantity: Number,
    color: String
})

const Gift = mongoose.model('gift', giftSchema);
module.exports = Gift;