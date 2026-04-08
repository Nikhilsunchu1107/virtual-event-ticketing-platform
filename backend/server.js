/**
 * Virtual Event Ticketing Platform - Backend Server
 * Main application entry point
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { genericLimiter } = require('./middleware/rateLimiter');

connectDB();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(genericLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/support', require('./routes/support'));
app.use('/api/crm', require('./routes/crm'));
app.use('/api/erp', require('./routes/erp'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║   Virtual Event Ticketing Platform - Backend         ║
  ║   🚀 Server running on http://localhost:${PORT}        ║
  ║   🔌 Connected to MongoDB                            ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
