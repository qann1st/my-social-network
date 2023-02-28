const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Ссылка некорректна',
    },
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
  },
  owner: {
    type: Object,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('posts', postSchema);
