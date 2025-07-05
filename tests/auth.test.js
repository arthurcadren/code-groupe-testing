const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');

jest.setTimeout(30000); // 30 seconds

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('devrait créer un utilisateur', async () => {
    const unique = Date.now();
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: `testuser${unique}`,
        password: 'test123',
        email: `test${unique}@propelize.com`
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Utilisateur créé');
  });

  it('devrait connecter un utilisateur', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'test123', email: 'test@propelize.com' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'test123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });

  it('devrait renouveler un token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'test123' });
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .send({ refreshToken: loginRes.body.refreshToken });
    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toBeDefined();
  });
});