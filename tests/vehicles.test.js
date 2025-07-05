const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

jest.setTimeout(30000); // 30 seconds

let accessToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  // Register and login a user to get a token
  await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', password: 'test123', email: 'test@propelize.com' });
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'testuser', password: 'test123' });
  accessToken = loginRes.body.accessToken;

  await Vehicle.deleteMany({});
  await Vehicle.create([
    { registrationNumber: 'ABC123', make: 'Toyota', model: 'Camry', year: 2020, rentalPrice: 50 },
    { registrationNumber: 'XYZ789', make: 'Honda', model: 'Civic', year: 2019, rentalPrice: 45 }
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Vehicle API', () => {
  it('devrait retourner tous les véhicules', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('devrait créer un nouveau véhicule', async () => {
    const newVehicle = {
      registrationNumber: 'DEF456',
      make: 'Ford',
      model: 'Focus',
      year: 2021,
      rentalPrice: 55
    };
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newVehicle);
    expect(res.statusCode).toEqual(201);
    expect(res.body.registrationNumber).toBe(newVehicle.registrationNumber);
  });

  it('devrait retourner un véhicule par ID', async () => {
    const vehicle = await Vehicle.findOne({ registrationNumber: 'ABC123' });
    const res = await request(app).get(`/api/vehicles/${vehicle._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.registrationNumber).toBe('ABC123');
  });

  it('devrait mettre à jour un véhicule', async () => {
    const vehicle = await Vehicle.findOne({ registrationNumber: 'ABC123' });
    const updatedData = { rentalPrice: 60 };
    const res = await request(app)
      .put(`/api/vehicles/${vehicle._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.rentalPrice).toBe(60);
  });

  it('devrait supprimer un véhicule', async () => {
    const vehicle = await Vehicle.findOne({ registrationNumber: 'XYZ789' });
    const res = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(204);
  });
});