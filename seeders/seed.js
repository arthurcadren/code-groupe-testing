const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');


const seedVehicles = async () => {
  await Vehicle.deleteMany({});
  await Vehicle.create([
    { registrationNumber: 'ABC123', make: 'Toyota', model: 'Camry', year: 2020, rentalPrice: 50 },
    { registrationNumber: 'XYZ789', make: 'Honda', model: 'Civic', year: 2019, rentalPrice: 45 }
  ]);
  console.log('Base de données initialisée avec des données de test.');
};


const seedUsers = async () => {
  await User.deleteMany({});
  await User.create([
    { username: 'admin', password: 'admin123', email: 'admin@propelize.com', role: 'admin' },
    { username: 'user', password: 'user123', email: 'user@propelize.com', role: 'user' }
  ]);
  console.log('Utilisateurs initialisés.');
};



module.exports = async () => {
  await seedUsers();
  await seedVehicles();
};