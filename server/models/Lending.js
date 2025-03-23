const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for installment payments
const installmentSchema = new Schema({
  amount_paid: {
    type: Number,
    required: true
  },
  payment_date: {
    type: Date,
    default: Date.now
  },
  balance_remaining: {
    type: Number,
    required: true
  },
  paid_by: {
    type: String,
    required: true,
    trim: true
  }
});

// Main Lending Schema
const lendingSchema = new Schema({
  customerCode: {
    type: String,
    ref: 'Customer',
    required: true
  },
  product_name: {
    type: String,
    required: true,
    trim: true
  },
  total_amount: {
    type: Number,
    required: true
  },
  amount_paid: {
    type: Number,
    default: 0
  },
  balance_due: {
    type: Number,
    required: true
  },
  sale_date: {
    type: Date,
    default: Date.now
  },
  due_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Overdue'],
    default: 'Pending'
  },
  installments: [installmentSchema]
});

// Pre-save hook to update status
lendingSchema.pre('save', function (next) {
  if (this.balance_due === 0) {
    this.status = 'Completed';
  } else if (new Date() > this.due_date && this.balance_due > 0) {
    this.status = 'Overdue';
  } else {
    this.status = 'Pending';
  }
  next();
});

module.exports = mongoose.model('Lending', lendingSchema);