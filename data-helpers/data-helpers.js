
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
//will need for tomorrow.
// const request = require('supertest');
// const app = require('../lib/app');
const seed = require('./seed');

describe('bookworm routes', () => {
  beforeAll(async() => { 
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(() => {
    return seed();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
});
