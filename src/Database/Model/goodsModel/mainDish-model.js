const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const MainDish = new Schema({
    profitRate: {
        type: Number
    }
});

module.exports = model('mainDish', MainDish);