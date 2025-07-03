const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const authMiddleware = require('../middleware/auth');

// GET all
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Véhicule non trouvé' });
  res.json(vehicle);
});

// POST
router.post('/', authMiddleware, async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT
router.put('/:id', authMiddleware, async (req, res) => {
  const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Véhicule non trouvé' });
  res.json(updated);
});

// DELETE
router.delete('/:id', authMiddleware, async (req, res) => {
  const deleted = await Vehicle.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Véhicule non trouvé' });
  res.status(204).end();
});

module.exports = router;