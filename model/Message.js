const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
        min: 4,
        max: 200
    },
    subject: {
        type: String,
        required: true,
        max: 5000
    },
    text: {
        type: String,
        required: true,
        max: 5000
    },
    html: {
        type: String,
        required: true,
        max: 5000
    }
});

module.exports = mongoose.model('Message', messageSchema);