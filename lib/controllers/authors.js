const { Router } = require('express');
const { Author } = require('../models/Authors');

module.exports = Router().get('/', async (req, res) => {
  const authors = await Author.getAll();
  res.json(authors);
});
