const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the customer model
const customerSchema = new Schema(
    {
        customerCode: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        fathersName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        contactNumber2: {
            type: String,
        },
        facebookId: {
            type: String,
        },
        caste: {
            type: String,
        },
        openingAccountBalance: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
        },
        accountType: {
            type: String,
        },
        dateOfRegistration: {
            type: Date,
            default: Date.now,
        },
        gender: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        note: {
            type: String,
        },
        lastPurchaseDate: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        profilePicture: {
            type: String
        },
    },
    { timestamps: true }
);

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;