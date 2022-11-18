const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SideDish = new Schema({
    capacity: {
        type: Number,
        min: [0, 'Capacity must greater than 0'],
        defautl: 0
    }
});

module.exports = model('sideDish', SideDish);