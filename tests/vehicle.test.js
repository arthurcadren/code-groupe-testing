const request = require('supertest');
const app = require('../index');

describe('GET /api/vehicles', () => {
  it('doit retourner 200', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toBe(200);
  });
});