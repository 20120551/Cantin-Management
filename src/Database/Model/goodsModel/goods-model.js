const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Goods = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    product: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['mainDish', 'sideDish']
    },
    goodType: {
        refPath: 'type',
        type: Schema.Types.ObjectId
    }
});

module.exports = model('goods', Goods);