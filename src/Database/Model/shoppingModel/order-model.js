const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Order = new Schema({
    createAt: {
        type: Date,
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    goods: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'goods',
        },
        quantity: {
            type: Number
        }
    }],
    totalPrice: {
        type: Number,
    },
    state: {
        type: String,
        enum: ['sucess', 'failure', 'pending', 'waiting']
    },
    receiver: {
        studentId: {
            type: String
        },
        name: {
            type: String
        }
    },
    timeReceive: {
        type: Date,
    }
});

module.exports = model('order', Order);