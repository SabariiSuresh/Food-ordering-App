

const mongoose = require('mongoose');


const restaurentschema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    createdat: { type: Date, default: Date.now }
}, { timestamps: true });


module.exports = mongoose.model('Restaurent', restaurentschema);