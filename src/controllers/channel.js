const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const requireAuthentication = require('../middlewares/requireAuthentication');

const router = express.Router();

router.all('*', [
  requireAuthentication,
]);

router.use(bodyParser.json());

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const channels = user.getChannels();

  return res.status(200)
    .json(channels);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const channel = await user.createChannel(req.body);

  return res.status(201)
    .json(channel);
}));

module.exports = router;
