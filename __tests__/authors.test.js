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
  it('#POST /authors/ adds new author', async () => {
    const author = {
      name: 'Tessa Farmiga',
      dob: '1999-07-07',
      pod: 'Charleston',
    };
    const res = await request(app).post('/authors/').send(author);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pod: expect.any(String),
      books: expect.any(Array),
    });
  });
  it('#POST /authors/ adds new author and links to books', async () => {
    const res = await request(app)
      .post('/authors/')
      .send({
        name: 'Tessa Farmiga',
        dob: '1999-07-07',
        pod: 'Charleston',
        bookIds: [5],
      });
    expect(res.status).toBe(200);
    console.log('res.body from id test is:', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pod: expect.any(String),
      books: expect.any(Array),
    });

    const authorRes = await request(app).get(`/authors/${res.body.id}`);
    expect(authorRes.body.books.length).toBe(1);
  });
});
afterAll(() => {
  pool.end();
});
