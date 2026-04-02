const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// ✅ Place a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { restaurantId, items } = req.body;

    if (!restaurantId || !items || items.length === 0) {
      return res.status(400).json({ error: "Restaurant and items are required" });
    }

    const order = new Order({
      user: req.user.id,
      restaurant: restaurantId,
      items
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all orders for logged‑in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('restaurant');
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;