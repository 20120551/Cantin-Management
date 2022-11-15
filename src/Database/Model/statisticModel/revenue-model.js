const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Revenue = new Schema({
    goods: [{
        _id: {
            ref: "goods",
            type: Schema.Types.ObjectId
        },
        quantity: {
            type: Number
        },
        currentPrice: {
            type: Number
        },
        rateProfit: {
            type: Number,
            default: 1
        }
    }],
    createAt: {
        type: Date,
    },
    totalMoney: {
        type: Number
    }
});

module.exports = model('revenue', Revenue);