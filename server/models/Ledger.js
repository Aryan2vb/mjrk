const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for the ledger model
const ledgerSchema = new Schema(
  {
    customerCode: {
      type: String,
      required: true,
      ref: "Customer", // Optional reference to the Customer model
    },
    transactionType: {
      type: String,
      enum: ["Credit", "Debit"], // Specify allowed transaction types
      required: true,
    },
    amount: {
      type: Number, // The transaction amount (positive for both Credit and Debit)
      required: true,
    },
    balance: {
      type: Number, // Running balance after the transaction
    },
    note: {
      type: String, // Optional description or note about the transaction
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Ledger = mongoose.model("Ledger", ledgerSchema);

module.exports = Ledger;
