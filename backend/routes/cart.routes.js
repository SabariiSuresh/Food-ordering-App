

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const verifyToken = require('../middleware/security');


router.post('/add' , verifyToken , cartController.addCart);
router.get('/' , verifyToken , cartController.getCart);
router.delete('/clear' , verifyToken , cartController.clearCart);

module.exports = router;