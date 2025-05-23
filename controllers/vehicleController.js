const Vehicle = require('../models/Vehicle');

exports.getAll = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};

exports.create = async (req, res) => {
  const newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  res.status(201).json(newVehicle);
};

exports.update = async (req, res) => {
  const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.remove = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.status(204).send();
};