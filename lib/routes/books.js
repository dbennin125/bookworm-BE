const { Router } = require('express');
const Book = require('../models/Book');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Book
      .create({ ...req.body, user: req.user._id })
      .then(book => res.send(book))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Book
      .find()
      .then(books => res.send(books))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Book
      .findById(req.params.id)
      .then(book => res.send(book))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Book
      .findByIdAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
      )
      .then(book => res.send(book))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Book
      .findByIdAndDelete({ _id: req.params.id, user: req.user._id })
      .then(book => res.send(book))
      .catch(next);
  });
  


