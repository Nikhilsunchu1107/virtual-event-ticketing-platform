/**
 * Inventory Controller
 * Handles inventory overview, stock adjustments, and low-stock alerts
 */

const Event = require('../models/Event');

/** Low-stock threshold constant (default) */
const DEFAULT_LOW_STOCK_THRESHOLD = 10;

/**
 * Get inventory overview for all events
 * GET /api/inventory
 */
exports.getInventoryOverview = async (req, res, next) => {
  try {
    const events = await Event.find()
      .select('title category price ticketsAvailable ticketsSold eventDate isActive')
      .sort({ eventDate: 1 })
      .lean();

    const inventory = events.map((event) => {
      const remaining = event.ticketsAvailable - event.ticketsSold;
      const occupancy = event.ticketsAvailable > 0
        ? ((event.ticketsSold / event.ticketsAvailable) * 100).toFixed(1)
        : '0.0';

      let stockStatus = 'in_stock';
      if (remaining <= 0) {
        stockStatus = 'sold_out';
      } else if (remaining <= DEFAULT_LOW_STOCK_THRESHOLD) {
        stockStatus = 'low_stock';
      }

      return {
        _id: event._id,
        title: event.title,
        category: event.category,
        price: event.price,
        ticketsAvailable: event.ticketsAvailable,
        ticketsSold: event.ticketsSold,
        remaining,
        occupancy: parseFloat(occupancy),
        stockStatus,
        eventDate: event.eventDate,
        isActive: event.isActive,
      };
    });

    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Adjust inventory for an event (increase or decrease ticketsAvailable)
 * PUT /api/inventory/:eventId/adjust
 */
exports.adjustInventory = async (req, res, next) => {
  try {
    const { adjustment } = req.body;

    if (adjustment === undefined || typeof adjustment !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a numeric adjustment value',
      });
    }

    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    const newTotal = event.ticketsAvailable + adjustment;

    // Cannot reduce below tickets already sold
    if (newTotal < event.ticketsSold) {
      return res.status(400).json({
        success: false,
        message: `Cannot set available tickets below sold count (${event.ticketsSold})`,
      });
    }

    // Cannot go below 0
    if (newTotal < 0) {
      return res.status(400).json({
        success: false,
        message: 'Total available tickets cannot be negative',
      });
    }

    event.ticketsAvailable = newTotal;
    await event.save();

    const remaining = event.ticketsAvailable - event.ticketsSold;
    let stockStatus = 'in_stock';
    if (remaining <= 0) {
      stockStatus = 'sold_out';
    } else if (remaining <= DEFAULT_LOW_STOCK_THRESHOLD) {
      stockStatus = 'low_stock';
    }

    res.status(200).json({
      success: true,
      message: `Inventory adjusted by ${adjustment > 0 ? '+' : ''}${adjustment}. New total: ${newTotal}`,
      event: {
        _id: event._id,
        title: event.title,
        ticketsAvailable: event.ticketsAvailable,
        ticketsSold: event.ticketsSold,
        remaining,
        stockStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get events with low stock
 * GET /api/inventory/low-stock
 */
exports.getLowStockEvents = async (req, res, next) => {
  try {
    const threshold = parseInt(req.query.threshold) || DEFAULT_LOW_STOCK_THRESHOLD;

    const events = await Event.find({ isActive: true })
      .select('title category price ticketsAvailable ticketsSold eventDate')
      .lean();

    const lowStockEvents = events
      .map((event) => {
        const remaining = event.ticketsAvailable - event.ticketsSold;
        return {
          _id: event._id,
          title: event.title,
          category: event.category,
          price: event.price,
          ticketsAvailable: event.ticketsAvailable,
          ticketsSold: event.ticketsSold,
          remaining,
          eventDate: event.eventDate,
          stockStatus: remaining <= 0 ? 'sold_out' : 'low_stock',
        };
      })
      .filter((event) => event.remaining <= threshold)
      .sort((a, b) => a.remaining - b.remaining);

    res.status(200).json({
      success: true,
      threshold,
      count: lowStockEvents.length,
      events: lowStockEvents,
    });
  } catch (error) {
    next(error);
  }
};
