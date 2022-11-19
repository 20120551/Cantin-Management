const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Shift = new Schema({
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    name: {
        type: String,
    }
});

module.exports = model('shift', Shift);