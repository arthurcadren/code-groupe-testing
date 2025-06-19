const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

// This runs before all tests
beforeAll(async () => {
  // Connect to MongoDB using the URL from your .env file
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Clear the vehicles collection and add two vehicles
  await Vehicle.deleteMany({});
  await Vehicle.create([
    { marque: 'Toyota', modele: 'Corolla', annee: 2020 },
    { marque: 'Honda', modele: 'Civic', annee: 2019 }
  ]);
});

// This runs after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test GET /api/vehicles', () => {
  it('devrait retourner tous les véhicules', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2); // We expect 2 vehicles
  });
});