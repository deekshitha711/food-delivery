const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  foodItems: [{ name: String, price: Number }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);