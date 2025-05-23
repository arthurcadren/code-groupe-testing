const request = require('supertest');
const app = require('../index'); // à adapter selon ta structure

describe('Test GET /api/vehicles', () => {
  it('devrait retourner tous les véhicules', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toEqual(200);
  });
});
