
const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const restaurentRouter = require('./restaurent.routes');
const foodRouter = require('./food.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

router.get('/', function (req, res, next) {
    res.json('App is ready now');
});

router.use('/auth/', authRouter);
router.use('/restaurent', restaurentRouter);
router.use('/food', foodRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

module.exports = router;