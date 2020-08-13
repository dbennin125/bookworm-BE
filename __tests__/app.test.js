require('dotenv').config();

require('../data-helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Book = require('../lib/models/Book');
const { prepare, agent, getLoggedInUser } = require('../data-helpers/data-helpers');


describe('book routes', () => {
  
  it('creates a book with VIA Post', async() => {
    const loggedInUser = await getLoggedInUser();
    
    return agent
      .post('/api/v1/books')
      .send({
        user: loggedInUser._id,
        title: 'new title',
        author: 'best author',
        pages: 50,
        description: 'Maybe the greatest book in the world - CNN'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          user: loggedInUser.id,
          title: 'new title',
          author: 'best author',
          pages: 50,
          description: 'Maybe the greatest book in the world - CNN'
        });
      });
  });

  it('gets all books via GET route', async() => {
    const loggedInUser = await getLoggedInUser();
    const books = prepare(await Book.find({ user: loggedInUser._id }));

    return agent
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual(books);
      });
  });

  it('gets a specific book by id VIA GET', async() => {
    const loggedInUser = await getLoggedInUser();
    const oneBook = prepare(await Book.findOne({ user: loggedInUser._id }));

    return agent
      .get(`/api/v1/books/${oneBook._id}`)
      .then(res => {
        expect(res.body).toEqual(oneBook);
      });
  });
  it('updates a specific book via PATCH', async() => {
    const loggedInUser = await getLoggedInUser();
    const oneBook = prepare(await Book.findOne({ user: loggedInUser._id }));

    return agent
      .patch(`/api/v1/books/${oneBook._id}`)
      .send({
        description: 'Ok, So maybe this book wasn\'t so good'
      })
      .then(res => {
        expect(res.body).toEqual({
          ...oneBook,
          description: 'Ok, So maybe this book wasn\'t so good'
        });
      });
  });
  it('deletes a specific book by id VIA DELETE route', async() => {
    const loggedInUser = await getLoggedInUser();
    const deleteBook = prepare(await Book.findOne({ user: loggedInUser._id }));

    return agent
      .delete(`/api/v1/books/${deleteBook._id}`)
      .then(res => {
        expect(res.body).toEqual(deleteBook);
      });
  });

});
