const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const SideDish = new Schema({
    capacity: {
        type: Number
    }
});

module.exports = model('sideDish', SideDish);