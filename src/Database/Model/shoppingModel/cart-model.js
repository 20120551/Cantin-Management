const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Cart = new Schema({
    goods: [{
        _id: {
            ref: "goods",
            type: Schema.Types.ObjectId 
        },
        quantity: {
            type: Number
        }
    }]
});

module.exports = model('cart', Cart);