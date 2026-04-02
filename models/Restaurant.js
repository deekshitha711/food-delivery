const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  foodItems: [
    {
      name: String,
      price: Number
    }
  ]
});

module.exports = mongoose.model('restaurants', restaurantSchema);