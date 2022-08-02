const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pod;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pod = row.pod;
    if (row.books) {
      this.books = row.books.length > 0 ? row.authors : [];
    }
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM authors;');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query();
  }
}

module.exports = { Author };
