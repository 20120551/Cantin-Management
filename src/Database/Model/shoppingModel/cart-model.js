const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Cart = new Schema({
    createBy: {
        type: String,
    },
    goods: [{
        ref: "goods",
        type: Schema.Types.ObjectId
    }]
});

module.exports = model('cart', Cart);