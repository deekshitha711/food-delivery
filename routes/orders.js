const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth'); // middleware to check JWT

// Place an order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantId, items } = req.body;
    const order = new Order({
      user: req.user.id,   // comes from JWT
      restaurantId,
      items
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;