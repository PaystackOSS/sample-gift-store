var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const orderController = require('../controllers/order');
const refundController = require('../controllers/refund');
const webhookController = require('../controllers/webhook');
const authorize = async function(req, res, next){
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
}
router.post('/order',orderController.create);

router.get('/order', orderController.fetch);

router.post('/refund', authorize, async function(req, res, next){
  if(req.user.role !== 'admin'){
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  return await refundController(req, res, next);
})

router.post('/webhook', webhookController);
module.exports = router;
