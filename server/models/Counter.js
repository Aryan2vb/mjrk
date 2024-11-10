const mongoose = require('mongoose');
const { Schema } = mongoose;

// Counter schema to track the last used number for customer code
const counterSchema = new Schema(
    {
        _id: { type: String, required: true }, // ID for the counter, will be "customerCode"
        seqValue: { type: Number, default: 1 }, // The current sequence value
    },
    { timestamps: true }
);

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;