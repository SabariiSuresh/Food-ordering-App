
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true },
    items: [{
        food: { type: mongoose.Schema.Types.ObjectId , ref: 'Food', required: true },
        quantity: Number,
    }],
    totalPrice: Number,
    deliveryAddress: { type: String, required: true },
    status: { type: String, enum: ['Placed', 'Preparing', 'Dispatched', 'Delivered', 'Canceled'], default: 'Placed' },
    orderAt: { type:Date, default: Date.now }

});


module.exports = mongoose.model('Order' , orderSchema)