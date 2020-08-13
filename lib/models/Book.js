const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }, 
  pages: {
    type: Number,
    required: true,
  }, 
  description: {
    type: String,
    required: true, 
    maxlength: 250
  }
}, {
  toJSON: {
    virtual: true, 
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
}
);

module.exports = mongoose.model('Book', schema);
