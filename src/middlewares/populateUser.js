const asyncHandler = require('express-async-handler');
const User = require('../models/user');

async function populateUser(req, res, next) {
  const { token } = req;
  if (!token || !token.user || !token.user._id) {
    return next();
  }

  req.user = await User.findById(token.user._id)
    .exec();

  return next();
}

module.exports = asyncHandler(populateUser);
