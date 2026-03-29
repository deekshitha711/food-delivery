const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [
    {
      name: String,
      quantity: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);