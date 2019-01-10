const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const router = express.Router();

router.use(bodyParser.json());

/**
 * @return token for Authorization header
 */
router.post('/login', asyncHandler(async (req, res) => {
  const auth = req.body;

  if (!auth.login) {
    return res.sendStatus(400);
  }

  const user = await User.findOne({ login: auth.login })
    .exec();

  if (!user) {
    return res.sendStatus(404);
  }

  // TODO: use real JWT
  const token = { user: { _id: user._id } };

  return res.status(200)
    .json(token);
}));

/**
 * @return new user
 */
router.post('/register', asyncHandler(async (req, res) => {
  const user = await (new User(req.body))
    .save();

  return res.status(201)
    .json(user);
}));

module.exports = router;
