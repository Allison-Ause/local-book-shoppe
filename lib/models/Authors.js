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
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM authors;');
    return rows.map((row) => new Author(row));
  }
}

module.exports = { Author };
