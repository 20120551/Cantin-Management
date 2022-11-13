const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Revenue = new Schema({
    goods: [{
        goodsInfo: {
            ref: "goods",
            type: Schema.Types.ObjectId
        },
        quantity: {
            type: Number
        },
    }],
    createAt: {
        type: Date,
    },
    totalMoney: {
        type: Number
    }
});

module.exports = model('revenue', Revenue);