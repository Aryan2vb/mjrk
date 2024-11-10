const mongoose = require('mongoose');

// Define the schema for the Customer
const customerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    fathersName: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    contactNumber2: { type: String },
    facebookId: { type: String },
    caste: { type: String },
    openingAccountBalance: { type: Number, required: true },
    status: { type: String, required: true },
    accountType: { type: String, required: true },
    dateOfRegistration: { type: Date, default: Date.now },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    note: { type: String },
    lastPurchaseDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create and export the model
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;