
const mongoose = require('mongoose');
require('dotenv').config();

async function connectDb() {

    try {

        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'food-delivery',
            tls: true,
            tlsAllowInvalidCertificates: false,
        })

        console.log("Mongoose connected ")

    } catch (err) {
        console.error("Failed to connect mongoose", err.message);
    }

}


module.exports = { connectDb };