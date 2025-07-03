const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API de location de véhicules en marche ');
});

// Routes
const vehicleRoutes = require('./routes/vehicles');
app.use('/api/vehicles', vehicleRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur est survenue' });
});

// Connect to MongoDB only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
      console.log("MongoDB connecté ");
      await require('./seeders/seed')();
      app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
    })
    .catch(err => console.error("Erreur MongoDB ", err));
}

module.exports = app;