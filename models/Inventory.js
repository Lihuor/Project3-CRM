const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Inventory', inventorySchema);

