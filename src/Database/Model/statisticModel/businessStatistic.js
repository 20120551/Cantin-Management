const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const BusinessStatistic = new Schema({
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
    createAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('businessStatistic', BusinessStatistic);