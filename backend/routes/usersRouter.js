const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getNowUser,
  getUser,
  editUser,
} = require('../controllers/usersController');

const router = require('express').Router();

router.get('/', getUsers);
router.get('/me', getNowUser);
router.get(
  '/:id',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }),
  editUser,
);

module.exports.usersRouter = router;
