const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: String,
  make: String,
  model: String,
  year: Number,
  rentalPrice: Number
});

module.exports = mongoose.model('Vehicle', vehicleSchema);