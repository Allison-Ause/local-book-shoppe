const { Router } = require('express');
const { Book } = require('../models/Books');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.json(book);
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .post('/', async (req, res) => {
    const data = await Book.insert(req.body);
    res.json(data);
  });
