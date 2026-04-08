/**
 * Expense Model
 * Schema for recording costs associated with running events
 */

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    category: {
      type: String,
      enum: ['speaker_fee', 'marketing', 'platform_fee', 'equipment', 'venue', 'staff', 'other'],
      default: 'other',
    },
    description: {
      type: String,
      required: [true, 'Please provide expense description'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide expense amount'],
      min: [0, 'Amount cannot be negative'],
    },
    vendor: {
      type: String,
      trim: true,
      maxlength: [200, 'Vendor name cannot exceed 200 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'paid', 'cancelled'],
      default: 'pending',
    },
    expenseDate: {
      type: Date,
      default: Date.now,
    },
    paymentDate: {
      type: Date,
      default: null,
    },
    receiptNumber: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

expenseSchema.index({ event: 1, category: 1 });
expenseSchema.index({ status: 1, expenseDate: 1 });

module.exports = mongoose.model('Expense', expenseSchema);