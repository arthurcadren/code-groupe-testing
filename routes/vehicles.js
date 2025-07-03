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

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé' });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: 'ID invalide' });
  }
});

module.exports = router;
