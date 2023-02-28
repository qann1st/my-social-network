const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signUp } = require('../controllers/authController');
const NotFoundError = require('../errors/NotFoundErrors');
const authMiddleware = require('../models/authMiddleware');
const { usersRouter } = require('./usersRouter');

router.use('/users', authMiddleware, usersRouter);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  signIn,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      avatar: Joi.string().uri(),
    }),
  }),
  signUp,
);
router.get('*', () => {
  throw new NotFoundError('Такого роута не существует');
});

module.exports = router;
