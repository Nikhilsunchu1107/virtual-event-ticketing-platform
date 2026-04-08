/**
 * MarketingCampaign Model
 * Schema for tracking email campaigns and promotional discounts
 */

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide campaign name'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    type: {
      type: String,
      enum: ['email', 'discount', 'promotion', 'newsletter'],
      default: 'email',
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    targetSegment: {
      type: String,
      enum: ['all', 'vip', 'new_users', 'inactive', 'category_specific'],
      default: 'all',
    },
    targetCategories: {
      type: [String],
      default: [],
    },
    discountCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    discountPercentage: {
      type: Number,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    discountAmount: {
      type: Number,
      min: [0, 'Discount amount cannot be negative'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide end date'],
    },
    targetAudienceCount: {
      type: Number,
      default: 0,
    },
    sentCount: {
      type: Number,
      default: 0,
    },
    openedCount: {
      type: Number,
      default: 0,
    },
    clickedCount: {
      type: Number,
      default: 0,
    },
    convertedCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'active', 'completed', 'cancelled'],
      default: 'draft',
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

campaignSchema.index({ status: 1, startDate: 1 });

module.exports = mongoose.model('MarketingCampaign', campaignSchema);