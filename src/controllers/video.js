const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const requireAuthentication = require('../middlewares/requireAuthentication');
const Channel = require('../models/channel');

const router = express.Router();

router.all('*', [
  requireAuthentication,
]);

router.use(bodyParser.json());

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const videos = user.getVideos();

  return res.status(200)
    .json(videos);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req;
  const channel = await Channel.findById(req.body.channel);

  if (!channel) {
    return res.status(400)
      .send('Channel not found');
  }

  const video = await user.createChannel(req.body);

  return res.status(201)
    .json(video);
}));

module.exports = router;
