const express = require('express');
const Subscription = require('../../models/Models/Subscription');

const router = express.Router();

// Route: POST /subscriptions — Add a new subscription
router.post('/', async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();
    res.json(newSubscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route: GET /subscriptions — Fetch all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
