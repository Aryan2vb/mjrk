const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    referredBy: {
        type: String,
        default: null
    },
    note: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Daily = mongoose.model('Daily', dailySchema);

module.exports = Daily;