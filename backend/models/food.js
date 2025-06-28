
const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({

    name : { type:String , required:true , trim:true },
    description : { type:String , required:true },
    price : { type:Number , required:true },
    image : { type:String },
    category : { type:String , required:true },
    restaurent : { type:mongoose.Schema.Types.ObjectId, ref:'Restaurent' , required:true },
    createdAt : {  type:Date , default:Date.now}

})


module.exports = mongoose.model('Food' , foodSchema);