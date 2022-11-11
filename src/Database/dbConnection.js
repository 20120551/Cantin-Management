const mongoose = require('mongoose');
const {MONGO_CONNECTION_STRING} = require('./../Config');

module.exports = async function connectToMongoDb() {
    try {
        await mongoose.connect(MONGO_CONNECTION_STRING);
        console.log('connect to mongoDb server successfully!!');
    } catch(err) {
        console.log('something occurs when connecting to mongoDb server');
        throw err;
    }
}