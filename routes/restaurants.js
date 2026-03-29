const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add restaurant (optional, for admin use)
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json(restaurant);
    res.send("New Restaurant data added!")
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/test', (req, res) => {
  res.send("Restaurants route working!");
});
module.exports = router;