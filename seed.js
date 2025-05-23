const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
require('dotenv').config();

const seedData = [
  { marque: 'Toyota', modele: 'Yaris', annee: 2020, disponible: true },
  { marque: 'Ford', modele: 'Focus', annee: 2019, disponible: false }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    await Vehicle.deleteMany();
    await Vehicle.insertMany(seedData);
    console.log('🌱 Données seed insérées');
    process.exit();
  });