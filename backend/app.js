const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const start = async (req, res, next) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.listen('4000', () => {
      console.log('Server started');
    });
  } catch (err) {
    console.error(err);
  }
};

start();
