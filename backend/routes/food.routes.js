

const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const verifyToken = require('../middleware/security');

router.post('/add' , verifyToken , foodController.addFood);
router.get('/restaurent/:restaurentId' , foodController.getFoodByRestaurent);
router.get('/all' ,foodController.getAllFoods);

module.exports = router;