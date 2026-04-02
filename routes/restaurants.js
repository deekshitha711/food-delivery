const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// ✅ Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get one restaurant by ID (with its menu)
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Add restaurant (admin use)
router.post('/', async (req, res) => {
  try {
    const { name, city, foodItems } = req.body;

    // Basic validation
    if (!name || !city || !foodItems || foodItems.length === 0) {
      return res.status(400).json({ error: "Name, city, and foodItems are required" });
    }

    const restaurant = new Restaurant({ name, city, foodItems });
    await restaurant.save();

    res.status(201).json({
      message: "New restaurant added successfully!",
      restaurant
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Test route
router.get('/test', (req, res) => {
  res.send("Restaurants route working!");
});

module.exports = router;