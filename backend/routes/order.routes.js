

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const verifyToken = require('../middleware/security');


router.post('/place' , verifyToken , orderController.placeOrder);
router.get('/' , verifyToken , orderController.getOrder);

module.exports = router;
