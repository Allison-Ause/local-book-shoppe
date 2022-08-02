const { Router } = require('express');
const { Author } = require('../models/Authors');

module.exports = Router()
  // .get('/:id', async (req, res) => {
  //   map through data to find by id
  //   const author = await Author.getById(req.params.id);
  //   console.log('by id author:', author);
  //   res.json(author);
  // })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  });
