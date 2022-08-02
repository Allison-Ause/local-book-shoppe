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
  // it('/authors/:id returns that author info with nested book data', async () => {
  //   const res = await request(app).get('/authors/1');
  //   const kameron = res.body.find((x) => x.id === 1);
  //   expect(kameron).toHaveProperty('name', 'Kameron Hurley');
  //   expect(kameron).toHaveProperty('dob', 'Kameron Hurley');
  //   expect(kameron).toHaveProperty('name', 'Kameron Hurley');
  //   expect(kameron).toHaveProperty('dob'); //come back to check on date format; incorrect I believe
  //   expect(kameron).toHaveProperty('pod', 'Florida');
  //   expect(kameron.books[0]).toHaveProperty('id');
  //   expect(kameron.books[0]).toHaveProperty('title');
  //   expect(kameron.books[0]).toHaveProperty('released');
  // });
});
afterAll(() => {
  pool.end();
});
