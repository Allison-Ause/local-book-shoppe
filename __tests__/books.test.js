const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/books returns a list of pure books table data', async () => {
    const res = await request(app).get('/books');
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
    });
  });
  it('/books/:id returns title, released and nested authors', async () => {
    const res = await request(app).get('/authors/6');
    expect(res.body).toMatchObject({
      name: 'Kameron Hurley',
      dob: expect.any(String),
      pob: 'Florida',
      books: [
        { id: 1, title: 'Gods War', released: 2004 },
        { id: 2, title: 'Stars Are Legion', released: 2018 },
      ],
    });
  });
});
afterAll(() => {
  pool.end();
});
