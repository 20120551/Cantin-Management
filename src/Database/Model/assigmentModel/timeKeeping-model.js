const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const TimeKeeping = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    workDays: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'assignment'
        },
        check: {
            type: Boolean,
            default: false
        }
    }]
});

module.exports = model('timeKeeping', TimeKeeping);