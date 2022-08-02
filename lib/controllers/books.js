const { Router } = require('express');
const { Book } = require('../models/Books');

module.exports = Router().get('/', async (req, res) => {
  const books = await Book.getAll();
  console.log('books from controller getAll:', books);
  res.json(books);
});
