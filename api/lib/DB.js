require('dotenv').config()
const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://reindeer:${process.env.DB_PASSWORD}@cluster0.8lbsy.mongodb.net/GiftStore?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
