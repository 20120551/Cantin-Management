const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Assignment = new Schema({
    assignmentDate: {
        type: Date,
    },
    shiftId: {
        type: Schema.Types.ObjectId,
        ref: 'shift'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = model('assignment', Assignment);