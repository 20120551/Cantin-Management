const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Order = new Schema({
    _id: {
        type: String,
    },
    createAt: {
        type: Date,
        default: new Date()
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
        enum: ['sucess', 'failure', 'pending', 'waiting', 'received'],
        default: 'waiting'
    },
    receiver: {
        studentId: {
            type: String
        },
        studentName: {
            type: String
        }
    },
    timeReceive: {
        type: Date,
    },
    qrCode: {
        type: String
    }
}, { _id: false });

module.exports = model('order', Order);