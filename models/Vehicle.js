const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  annee: Number,
  disponible: Boolean
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
