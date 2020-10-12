const mongoose = require('mongoose');

const electricianSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  email: { type: String, required: true },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('electrician', electricianSchema);

