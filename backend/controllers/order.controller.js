

const Order = require('../models/order');
const Cart = require('../models/cart');


exports.placeOrder = async (req, res) => {

    const userId = req.user.id;

    try {

        const cart = await Cart.findOne({ user: userId }).populate('items.food');
        const {deliveryAddress} = req.body;

        if(!deliveryAddress){
            return res.status(400).json({ message : 'Delivery address required'});
        }

        if (!cart || cart.items.length === 0) {
            res.status(200).json({ message: 'Cart is empty' })
        }

        const totalPrice = cart.items.reduce((sum, item) => {
            return sum + item.food.price * item.quantity;
        }, 0);

        const newOrdern = new Order({
            user: userId,
            items: cart.items.map(item => ({
                food: item.food._id,
                quantity: item.quantity
            })),
            deliveryAddress,
            totalPrice
        })

        await newOrdern.save();
        await cart.deleteOne({ user: userId });

        res.status(200).json({ message: 'Order placed successfully', order: newOrdern })

    } catch (err) {
        res.status(500).json({ message: 'Failed to place Order', error: err.message })
    }

}


exports.getOrder = async (req, res) => {

    const userId = req.user.id;

    try {

        const orders = await Order.find({ user: userId }).sort({ orderAt: -1 }).populate('items.food');

        res.status(200).json(orders)

    } catch (err) {
        res.status(500).json({ message: 'Error to featch order', error: err.message })
    }

}