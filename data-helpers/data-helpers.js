require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
//will need for tomorrow.
const request = require('supertest');
const app = require('../lib/app');
const seed = require('./seed');
const User = require('../lib/models/User');



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

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/login')
    .send({
      email: 'test0@test.com',
      password: 'pass1234'
    });
});

afterAll(async() => {
  await mongoose.connection.close();
  return mongod.stop();
});


const prepareOne = model => JSON.parse(JSON.stringify(model));
const prepareMany = models => models.map(prepareOne);

const prepare = model => {
  if(Array.isArray(model)) return prepareMany(model);
  return prepareOne(model);
};

const getLoggedInUser = () => User.findOne({ email: 'test0@test.com' });

module.exports = {
  prepare, 
  agent, 
  getLoggedInUser
};
