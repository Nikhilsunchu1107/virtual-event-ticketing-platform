/**
 * ERP Routes
 * Enterprise Resource Planning endpoints
 */

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const Resource = require('../models/Resource');
const Expense = require('../models/Expense');
const Event = require('../models/Event');
const Order = require('../models/Order');

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'ERP API running' });
});

router.get('/resources', protect, admin, async (req, res) => {
  try {
    const { type, isActive } = req.query;
    let query = {};

    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const resources = await Resource.find(query).sort({ createdAt: -1 });

    res.json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/resources', protect, admin, async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      availableCapacity: req.body.totalCapacity,
    });

    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/resources/:id', protect, admin, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    res.json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/resources/:id', protect, admin, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/resources/available', async (req, res) => {
  try {
    const { type, capacity } = req.query;
    let query = { isActive: true, availableCapacity: { $gte: parseInt(capacity) || 1 } };

    if (type) query.type = type;

    const resources = await Resource.find(query);

    res.json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/expenses', protect, admin, async (req, res) => {
  try {
    const { eventId, category, status, startDate, endDate, page = 1, limit = 20 } = req.query;
    let query = {};

    if (eventId) query.event = eventId;
    if (category) query.category = category;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.expenseDate = {};
      if (startDate) query.expenseDate.$gte = new Date(startDate);
      if (endDate) query.expenseDate.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const expenses = await Expense.find(query)
      .populate('event', 'title eventDate')
      .populate('createdBy', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ expenseDate: -1 });

    const total = await Expense.countDocuments(query);

    res.json({
      success: true,
      data: expenses,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/expenses', protect, admin, async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      createdBy: req.user.id,
    });

    await expense.populate('event', 'title');
    await expense.populate('createdBy', 'name');

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/expenses/:id', protect, admin, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('event', 'title').populate('createdBy', 'name');

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/expenses/:id', protect, admin, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/expenses/event/:eventId/total', async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $match: { event: require('mongoose').Types.ObjectId(req.params.eventId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const total = expenses.length > 0 ? expenses[0].total : 0;

    res.json({ success: true, data: { totalExpenses: total } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/finances/summary', protect, admin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const revenueResult = await Order.aggregate([
      { 
        $match: { 
          paymentStatus: 'completed', 
          orderStatus: 'confirmed',
          ...(startDate || endDate ? { createdAt: dateFilter } : {})
        }
      },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
    ]);

    const expenseResult = await Expense.aggregate([
      { 
        $match: { 
          status: 'paid',
          ...(startDate || endDate ? { expenseDate: dateFilter } : {})
        }
      },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
    ]);

    const revenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    const expenses = expenseResult.length > 0 ? expenseResult[0].totalExpenses : 0;
    const profit = revenue - expenses;
    const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        revenue,
        expenses,
        profit,
        profitMargin,
        totalOrders: revenueResult.length > 0 ? revenueResult[0].count : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/finances/event/:eventId', protect, admin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const orders = await Order.find({ 
      'tickets.event': req.params.eventId, 
      paymentStatus: 'completed' 
    });
    
    const revenue = orders.reduce((sum, order) => {
      const eventTickets = order.tickets.filter(t => t.event.toString() === req.params.eventId);
      return sum + eventTickets.reduce((s, t) => s + (t.quantity * (event.price || 0)), 0);
    }, 0);

    const expenses = await Expense.aggregate([
      { $match: { event: require('mongoose').Types.ObjectId(req.params.eventId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpenses = expenses.length > 0 ? expenses[0].total : 0;
    const profit = revenue - totalExpenses;
    const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        event: { id: event._id, title: event.title, budget: event.budget },
        revenue,
        expenses: totalExpenses,
        profit,
        profitMargin: margin,
        ticketsSold: event.ticketsSold,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/finances/chart', protect, admin, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let dateFormat, groupBy;

    if (period === 'year') {
      dateFormat = '%Y';
      groupBy = { year: '$createdAt' };
    } else if (period === 'week') {
      dateFormat = '%Y-%U';
      groupBy = { year: { $year: '$createdAt' }, week: { $week: '$createdAt' } };
    } else {
      dateFormat = '%Y-%m';
      groupBy = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } };
    }

    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'completed', orderStatus: 'confirmed' } },
      {
        $group: {
          _id: groupBy,
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const expenseData = await Expense.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: groupBy,
          expenses: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({
      success: true,
      data: {
        revenue: revenueData,
        expenses: expenseData,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;