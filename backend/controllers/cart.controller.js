
const Cart = require('../models/cart');

exports.addCart = async (req, res) => {

    const userId = req.user.id;
    const { foodId, quantity } = req.body

    try {

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: { food: foodId, quantity }

            });
            
        } else {
            const existingItem = cart.items.find(item => item.food == foodId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ food: foodId, quantity })
            }
        }

        cart.updateAt = Date.now();

        await cart.save();

        res.status(200).json({ message: 'Item added to cart', cart })

    } catch (err) {
        console.error('Error :' , err)
        res.status(500).json({ message: 'Failed to add cart', error: err.message })
    }
}


exports.getCart = async (req, res) => {

    const userId = req.user.id;

    try {

        const cart = await Cart.findOne({ user: userId }).populate('items.food');
        res.status(200).json(cart || { items: [] })

    } catch (err) {
        res.status(500).json({ message: 'Error to fetch cart', error: err.message })
    }

}


exports.clearCart = async (req, res) => {
    try {

        await Cart.deleteOne({ user: req.user.id });

        res.status(200).json({ message: 'Item removed to cart' })

    } catch (err) {
        res.status(500).json({ message: 'Error to clear cart', error: err.message })
    }
}