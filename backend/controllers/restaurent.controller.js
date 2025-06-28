
const Restaurent = require('../models/restaurent');

exports.addRestaurent = async (req, res) => {
    try {

        const { name, address, image } = req.body

        const newRestaurent = new Restaurent({ name, address, image });
        await newRestaurent.save();

        res.status(201).json({ message: 'Restaurent added', restaurent: newRestaurent })

    } catch (err) {
        if (err) {
            res.status(500).json({ message: 'Error to adding restaurent', error: err.message });
        }
    }
}

exports.getRestaurent = async (req, res) => {
    try {

        const restaurent = await Restaurent.find().sort({ createdAt: -1 });
        res.json(restaurent);

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetching Restaurent ' })
    }
}