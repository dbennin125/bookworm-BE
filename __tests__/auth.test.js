require('dotenv').config();

require('../data-helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const User = require('../lib/models/User');
const { prepare } = require('../data-helpers/data-helpers');


describe('auth routes', () => { 

  it('will create a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test0@test.com',
        password: 'pass1234',
        userImage: 'https://image.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          email: 'test0@test.com',
          userImage: 'https://image.com'
        });
      });
  });

});
