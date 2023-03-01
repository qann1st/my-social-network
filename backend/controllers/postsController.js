const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundErrors');
const postSchema = require('../models/postSchema');
const userSchema = require('../models/userSchema');

module.exports.getPosts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const posts = await postSchema.find({});
    res.send({
      posts: posts.reverse().slice((page - 1) * limit, page * limit),
      pages: Math.ceil(posts.length / limit),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const owner = await userSchema.findById(req.user._id);
    req.body.owner = { name: owner.name, avatar: owner.avatar, _id: owner._id };
    req.body.data = `${new Date().toLocaleDateString()} ${
      new Date().toTimeString().split(' ')[0]
    }`;
    const post = await postSchema.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    next(new BadRequestError('Не удалось создать пост'));
  }
};

module.exports.addLike = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    const post = await postSchema
      .findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            likes: { name: user.name, avatar: user.avatar, _id: user._id },
          },
        },
        { new: true, runValidators: true },
      )
      .populate('likes owner');
    if (post.id === req.params.id) res.send(post);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректное id поста'));
    } else {
      next(new NotFoundError('Пост не найден'));
    }
  }
};

module.exports.deleteLike = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    const post = await postSchema.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: { name: user.name, avatar: user.avatar, _id: user._id },
        },
      },
      { new: true, runValidators: true },
    );
    if (post === null) {
      throw new NotFoundError('Пост с лайком не найден');
    } else {
      res.send(post);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректное id поста'));
    } else {
      next(err);
    }
  }
};

module.exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const user = await userSchema.findById(req.user._id);
    const post = await postSchema
      .findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            comments: { name: user.name, avatar: user.avatar, text },
          },
        },
        { new: true, runValidators: true },
      )
      .populate('comments owner');
    if (post.id === req.params.id) res.send(post);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректное id карточки'));
    } else {
      next(new NotFoundError('Карточка не найдена'));
    }
  }
};
