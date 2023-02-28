const { celebrate, Joi } = require('celebrate');
const {
  getPosts,
  createPost,
  addLike,
  deleteLike,
  addComment,
} = require('../controllers/postsController');

const router = require('express').Router();

router.get('/', getPosts);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      image: Joi.string().uri(),
      description: Joi.string().min(2),
    }),
  }),
  createPost,
);
router.put(
  '/:id/like',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  addLike,
);
router.delete(
  '/:id/like',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  deleteLike,
);
router.put(
  '/:id/comment',
  celebrate({
    body: {
      text: Joi.string().min(2).required(),
    },
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  addComment,
);

module.exports.postsRouter = router;
