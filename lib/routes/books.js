const { Router } = require('express');
const Book = require('../models/Book');
const ensureAuth = require('../middleware/ensure-auth');

const BOOKS_PER_PAGE = 5;
const skipPerPage = (page, perPage) => (page - 1) * perPage;
const getTotalPages = (count, perPage) => Math.ceil(count / perPage);

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
    const { page = 1, perPage = BOOKS_PER_PAGE } = req.query;
    Promise.all([
      Book
        .find({ user: req.user._id })
        .count(),    
      Book
        .find({ user: req.user._id })      
        .limit(perPage)
        .skip(skipPerPage(page, perPage))
    ])
      .then(([count, books])=> res.send({ books, totalPages: getTotalPages(count, perPage) }))
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
  


