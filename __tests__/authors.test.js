const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/authors returns a list of pure books table data', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length === 5);
  });
  it('/authors/:id returns title, released and nested authors', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body).toMatchObject({
      id: '1',
      name: 'Kameron Hurley',
      dob: expect.any(String),
      pod: 'Florida',
      books: [
        { id: 1, title: 'Gods War', released: 2004 },
        { id: 2, title: 'The Stars Are Legion', released: 2018 },
      ],
    });
  });
});
afterAll(() => {
  pool.end();
});
