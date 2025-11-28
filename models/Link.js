const mongoose = require('mongoose');
const shortid = require('shortid');

const LinkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        default: shortid.generate
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Link', LinkSchema);
