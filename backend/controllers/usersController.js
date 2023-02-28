const userSchema = require('../models/userSchema');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};
