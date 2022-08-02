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
    const res = await request(app).get('/books/6');
    expect(res.body.length).toEqual(7);
    const goodOmens = res.body.find((x) => x.id === '6');
    expect(goodOmens).toHaveProperty('title', 'Good Omens');
    expect(goodOmens).toHaveProperty('released', 2000);
    expect(goodOmens.authors[0]).toHaveProperty('id');
    expect(goodOmens.authors[0]).toHaveProperty('name');
  });
});
afterAll(() => {
  pool.end();
});

//   expect(res.body).toMatchObject({
//     id: '1',
//     title: 'Gods War',
//     released: 2004,
//     authors: [
//       {
//         id: '1',
//         name: 'Kameron Hurley',
//       },
//     ],
//   });
// })
