const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');
const helmet = require('helmet');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/loggerMiddleware');
const { error } = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const start = async (req, res, next) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/socialnetwork');

    const app = express();
    app.use(requestLogger);
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(cookieParser());

    app.use('/', router);
    app.use(errorLogger);
    app.use(error);

    app.listen('4000', () => {
      console.log('Server started');
    });
  } catch (err) {
    next(err);
  }
};

start();
