const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Shift = new Schema({
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    name: {
        type: String,
    }
});

module.exports = model('shift', Shift);