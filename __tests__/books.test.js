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
    console.log('Res.body', res.body);
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
