const chance = require('chance').Chance();
const Book = require('../lib/models/Book');
const User = require('../lib/models/User');

module.exports = async({ books = 20, users = 5 } = {}) => {
  const createdUsers = 
  await User.create([...Array(users)].map((_, i) => ({
    email: `test${i}@test.com`,
    password: 'pass1234',
    userImage: chance.url()
  })));
  
  await Book.create([...Array(books)].map(() => ({
    user: chance.pickone(createdUsers)._id,
    title: `${chance.profession()} ${chance.animal()}`,
    author: chance.name({ prefix: true }),
    pages: chance.natural({ min: 1, max: 20 }),
    description: chance.word({ min: 1, max: 15 })
  })));
};
