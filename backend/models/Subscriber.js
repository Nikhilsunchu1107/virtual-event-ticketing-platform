const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  source: {
    type: String,
    default: 'footer',
  },
  referralCode: {
    type: String,
    default: null,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);