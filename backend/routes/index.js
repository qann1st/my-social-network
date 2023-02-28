const { usersRouter } = require('./usersRouter');

const router = require('express').Router();

router.use('/users', usersRouter);

module.exports = router;
