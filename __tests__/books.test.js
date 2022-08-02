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
  afterAll(() => {
    pool.end();
  });
  it('/books/:id returns title, released and nested authors', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: '1',
      title: 'Gods War',
      authors: [
        {
          id: '1',
          name: 'Kameron Hurley',
        },
      ],
    });
  });
});
