const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Owner = new Schema({
    fullName: {
        type: String,
        default: "Admin"
    },
    image: {
        type: String,
        default: "https://previews.123rf.com/images/briang77/briang771512/briang77151202582/49683958-user-icon-vector.jpg"
    },
});

module.exports = model('owner', Owner);