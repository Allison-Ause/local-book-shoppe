const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/books returns a list of pure books table data', async () => {
    const res = await request(app).get('/authors');
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(Date),
      released: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
