const rateLimit = require('express-rate-limit');

const genericLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 10 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 10 seconds',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { genericLimiter, authLimiter };