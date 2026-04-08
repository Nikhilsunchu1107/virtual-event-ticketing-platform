const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/subscribe', async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address',
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();

        return res.status(200).json({
          success: true,
          message: 'You have been re-subscribed successfully!',
        });
      }

      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed',
      });
    }

    const subscriber = await Subscriber.create({
      email: email.toLowerCase(),
      source: source || 'footer',
      referralCode: req.query.ref || null,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing!',
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ status: 'active' }).sort({ subscribedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;