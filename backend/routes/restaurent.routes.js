

const express = require('express');
const router = express.Router();
const restaurentController = require('../controllers/restaurent.controller');
const verifyToken = require('../middleware/security');

router.post('/add' , verifyToken , restaurentController.addRestaurent );
router.get('/list'  , restaurentController.getRestaurent );

module.exports = router;