const { Router } = require('express');
const Book = require('../models/Book');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Book
      .create(
        { ...req.body, user: req.user._id }
      )
      .then(book => res.send(book))
      .catch(next);
  })
  // .get('/', (req, res, next) => {
  //   Book
  //     .find()
  //     .then(books => res.send(books))
  //     .catch(next);
  // })
  .get('/', ensureAuth, (req, res, next) => {
    Book
      .find({ user: req.user._id })
      .then(books => res.send(books))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    Book
      .findOne({ user: req.user._id, _id: req.params.id })
      .then(book => res.send(book))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Book
      .findOneAndUpdate(
        { user: req.user._id, _id: req.params.id  },
        req.body,
        { new: true }
      )
      .then(book => res.send(book))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Book
      .findOneAndDelete({ user: req.user._id, _id: req.params.id })
      .then(book => res.send(book))
      .catch(next);
  });
  


