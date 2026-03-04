/**
 * Inventory Routes
 */

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getInventoryOverview,
  adjustInventory,
  getLowStockEvents,
} = require('../controllers/inventoryController');

// All inventory routes require admin access
router.use(protect, admin);

router.get('/', getInventoryOverview);
router.get('/low-stock', getLowStockEvents);
router.put('/:eventId/adjust', adjustInventory);

module.exports = router;
