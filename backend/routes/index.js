const NotFoundError = require('../errors/NotFoundErrors');
const { usersRouter } = require('./usersRouter');

const router = require('express').Router();

router.use('/users', usersRouter);
router.get('*', () => {
  throw new NotFoundError('Такого роута не существует');
});

module.exports = router;
