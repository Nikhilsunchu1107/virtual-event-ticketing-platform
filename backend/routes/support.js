/**
 * Support Routes
 */

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  createTicket,
  getTickets,
  getTicketById,
  replyToTicket,
  updateTicketStatus,
} = require('../controllers/supportController');

router.use(protect);

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/:id/reply', replyToTicket);
router.patch('/:id/status', admin, updateTicketStatus);

module.exports = router;
