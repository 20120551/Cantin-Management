const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

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
    goodsType: {
        refPath: 'type',
        type: Schema.Types.ObjectId
    }
});

Goods.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = model('goods', Goods);