const chance = require('chance').Chance();
const Book = require('../lib/models/Book');

module.exports = async({ books = 20 } = {}) => {
  await Book.create([...Array(books)].map(() => ({
    title: `${chance.profession()} ${chance.animal()}`,
    author: chance.name({ prefix: true }),
    page: chance.natural({ min: 1, max: 200 }),
    description: chance.paragraph({ min: 1, max: 100 })
  })));
};
