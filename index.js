const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API de location de véhicules en marche 🚗');
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connecté ✔️");
    app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
  })
  .catch(err => console.error("Erreur MongoDB ❌", err));


  //
const vehicleRoutes = require('./routes/vehicles');
app.use('/api/vehicles', vehicleRoutes);
