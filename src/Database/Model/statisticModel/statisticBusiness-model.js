const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const statisticBusiness = new Schema({
    revenues: [{
        type: Schema.Types.ObjectId,
        ref: 'revenue'
    }],
    receiveNotes: [{
        type: Schema.Types.ObjectId,
        ref: 'receiveNote'
    }],
    totalSoldMoney: {
        type: Number
    },
    totalSpentMoney: {
        type: Number
    },
    profit: {
        type: Number
    },
});

module.exports = model('statisticBusiness', statisticBusiness);