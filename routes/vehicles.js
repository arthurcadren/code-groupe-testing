const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// GET all
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// POST
router.post('/', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.status(201).json(vehicle);
});

// PUT
router.put('/:id', async (req, res) => {
  const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
