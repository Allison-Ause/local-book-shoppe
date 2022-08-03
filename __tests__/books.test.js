const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Book } = require('../lib/models/Books');

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
    const res = await request(app).get('/books/6');
    expect(res.body).toMatchObject({
      id: '6',
      title: 'Good Omens',
      released: 2000,
      authors: [
        { id: 4, name: 'Neil Gaiman' },
        { id: 5, name: 'Terry Prachet' },
      ],
    });
  });

  it('#POST /books/ add new book', async () => {
    const book = {
      title: 'Neverwhere',
      released: 2002,
    };
    const res = await request(app).post('/books/').send(book);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
      // authors: expect.any(Array),
    });
  });

  it('#POST /books/ adds new book and links to authors', async () => {
    const res = await request(app)
      .post('/books/')
      .send({
        id: '7',
        title: 'Neverwhere',
        released: 2002,
        authorIds: [4],
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
    });
    const bookRes = await request(app).get(`/books/${res.body.id}`);
    expect(bookRes.body.authors.length).toBe(1);
  });
});
afterAll(() => {
  pool.end();
});
