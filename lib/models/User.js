const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//I am preemptively making this because the directions say we will do this tomorrow. 
const schema = new mongoose.Schema({
  email: {
    type: String, 
    required: true
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

module.exports = mongoose.model('User', schema);
