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
    const addedBook = await Book.insert(req.body);
    if (req.body.authorIds) {
      await Promise.all(
        req.body.authorIds.map((id) => addedBook.addAuthorById(id))
      );
    }
    res.json(addedBook);
  });
