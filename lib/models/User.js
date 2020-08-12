const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//I am preemptively making this because the directions say we will do this tomorrow. 
const schema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
  }
}, {
  toJSON: {
    
    transform: (doc, ret) => {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
}
);

schema.virtual('password').set(function(textPassword) {
  const passwordHash = bcrypt.hashSync(textPassword, +process.env.SALT_ROUNDS || 2);
  this.passwordHash = passwordHash;
});

schema.statics.authorize = async function(email, password) {
  const user = await this.findOne({ email });
  if(!user) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }

  const passwordsMatch = bcrypt.compare(password, user.passwordHash);
  if(!passwordsMatch) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }

  return user;
};

schema.methods.authToken = function() {
  const token = jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET || 'hello', {
    expiresIn: '24hr'
  });
  return token;
};

module.exports = mongoose.model('User', schema);
