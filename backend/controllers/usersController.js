const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundErrors');
const postSchema = require('../models/postSchema');
const userSchema = require('../models/userSchema');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getPostsByUser = async (req, res, next) => {
  try {
    const post = await postSchema.find({
      'owner.name': req.params.id,
    });
    if (post === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(post.reverse());
  } catch (err) {
    next(err);
  }
};

module.exports.getNowUser = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const user = await userSchema.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    next(new BadRequestError('Не удалось изменить данные пользователя'));
  }
};
