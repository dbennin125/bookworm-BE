const chance = require('chance').Chance();
const Book = require('../lib/models/Book');

module.exports = async({ books = 20 } = {}) => {
  await Book.create([...Array(books)].map(() => ({
    title: `${chance.profession()} ${chance.animal()}`,
    author: chance.name({ prefix: true }),
    pages: chance.natural({ min: 1, max: 20 }),
    description: chance.word({ min: 1, max: 5 })
  })));
};
