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

const allowDomains = ['http://localhost:5173'];
const corsOptions = {
  origin(origin, callback) {
    if (allowDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Ваш домен не находится в списке разрешенных'));
    }
  },
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true,
};

const start = async (req, res, next) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/socialnetwork');

    const app = express();
    app.use(requestLogger);
    app.use(express.json());
    app.use(helmet());
    app.use(cors(corsOptions));
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
