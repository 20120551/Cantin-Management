const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const DeliveryNote = new Schema({
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
        default: new Date()
    }
});

module.exports = model('deliveryNote', DeliveryNote);