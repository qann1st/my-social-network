const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const { default: isURL } = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: () => 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 6,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg',
  },
  description: {
    type: String,
    default: 'Пока описания нет',
    minLength: 2,
  },
});

module.exports = mongoose.model('users', userSchema);
