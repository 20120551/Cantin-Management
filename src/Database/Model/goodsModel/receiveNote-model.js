const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const ReceiveNote = new Schema({
    goods: [{
        goodsInfo: {
            ref: "goods",
            type: Schema.Types.ObjectId
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        }
    }],
    createAt: {
        type: Date,
    },
    totalPrice: {
        type: Number
    }
});

module.exports = model('receiveNote', ReceiveNote);