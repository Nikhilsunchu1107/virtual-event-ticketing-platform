/**
 * Ticket Message Model
 * Stores conversation messages for support tickets
 */

const mongoose = require('mongoose');

const ticketMessageSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportTicket',
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    isAdminReply: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TicketMessage', ticketMessageSchema);
