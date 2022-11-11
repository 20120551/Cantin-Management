const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Staff = new Schema({
    fullName: {
        type: String,
        default: 'Nhân viên'
    },
    birthDay: {
        type: Date,
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/2332/2332039.png'
    },
    sex: {
        type: String
    }
});

module.exports = model('staff', Staff);