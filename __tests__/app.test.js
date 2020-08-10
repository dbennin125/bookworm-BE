require('../data-helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Book = require('../lib/models/Book');
const { prepare } = require('../data-helpers/data-helpers');


describe('book routes', () => {
  
  it('creates a book with VIA Post', async() => {
    return request(app)
      .post('/api/v1/books')
      .send({
        title: 'new title',
        author: 'best author',
        pages: 50,
        description: 'Maybe the greatest book in the world - CNN'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          title: 'new title',
          author: 'best author',
          pages: 50,
          description: 'Maybe the greatest book in the world - CNN'
        });
      });
  });

  it('gets all books via GET route', async() => {
    const books = prepare(await Book.find());

    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual(books);
      });
  });

  it('gets a specific book by id VIA GET', async() => {
    const oneBook = prepare(await Book.findOne());

    return request(app)
      .get(`/api/v1/books/${oneBook._id}`)
      .then(res => {
        expect(res.body).toEqual(oneBook);
      });
  });

});
