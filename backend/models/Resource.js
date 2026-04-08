/**
 * Resource Model
 * Schema for managing event resources (virtual venues, streaming limits, etc.)
 */

const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide resource name'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    type: {
      type: String,
      enum: ['virtual_venue', 'streaming', 'zoom_license', 'bandwidth', 'physical_venue', 'other'],
      default: 'other',
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    totalCapacity: {
      type: Number,
      required: [true, 'Please provide total capacity'],
      min: [0, 'Capacity cannot be negative'],
    },
    availableCapacity: {
      type: Number,
      required: true,
      min: [0, 'Available capacity cannot be negative'],
    },
    usedCapacity: {
      type: Number,
      default: 0,
      min: [0, 'Used capacity cannot be negative'],
    },
    unit: {
      type: String,
      enum: ['connections', 'seats', 'bandwidth_gb', 'hours', 'other'],
      default: 'connections',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    costPerUnit: {
      type: Number,
      min: [0, 'Cost cannot be negative'],
      default: 0,
    },
    allocatedEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

resourceSchema.index({ type: 1, isActive: 1 });
resourceSchema.index({ availableCapacity: 1 });

module.exports = mongoose.model('Resource', resourceSchema);