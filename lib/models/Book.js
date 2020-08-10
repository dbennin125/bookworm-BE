const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
}
);

module.exports = mongoose.model('Book', schema);
