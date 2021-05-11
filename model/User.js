const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 200
    },
    email: {
        type: String,
        required: true,
        max: 300
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 1000
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);