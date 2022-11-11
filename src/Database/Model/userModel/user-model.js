const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    kind: {
        type: String,
        required: true,
        enum: ['staff', 'owner']
    },
    userType: {
        refPath: 'kind',
        type: Schema.Types.ObjectId
    },
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
});

module.exports = model('user', User);