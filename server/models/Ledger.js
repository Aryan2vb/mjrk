const mongoose = require("mongoose");
const { Schema } = mongoose;

// Ledger Schema
const ledgerSchema = new Schema(
  {
    customerCode: {
      type: String,
      required: true,
      ref: "Customer",
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String, // E.g., "Purchase of goods", "Payment received"
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["credit", "debit"], // Credit increases balance, debit decreases
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceAfterTransaction: {
      type: Number, // Calculated field to track balance
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["cash", "bank transfer", "cheque", "other"],
    },
    referenceNumber: {
      type: String, // Optional for tracking bank transfer/cheque details
    },
  },
  { timestamps: true },
);

const Ledger = mongoose.model("Ledger", ledgerSchema);
module.exports = Ledger;
