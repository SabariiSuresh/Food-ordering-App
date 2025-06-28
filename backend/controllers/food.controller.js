
const Food = require('../models/food');


exports.addFood = async (req , res)=> {
    try{

        const { name , description , price , restaurent , image , category } = req.body;

        const newFood = new Food({ name , description , price , restaurent , image , category });

        await newFood.save();

        res.status(200).json({ message : 'Food item added' , food : newFood});

    }catch(err){
        console.error('Fooderr' , err)
        res.status(500).json({ message : 'Error to add food' , error : err.message})
    }
}

exports.getFoodByRestaurent = async (req ,res)=>{
    try{

        const {restaurentId} = req.params;

        const food = await Food.find({restaurent:restaurentId});

        res.status(200).json(food)

    } catch(err){
        console.error('Fooderr' , err)
        res.status(500).json({ message : 'Error to fetch food items' , error : err.message});
    }
}


exports.getAllFoods = async (req,res)=>{
    try{

        const foods = await Food.find().populate('restaurent' , 'name');
        res.status(200).json(foods)

    } catch(err){
        res.status(500).json({ message : 'Error to fetching all foods'});
    }
}