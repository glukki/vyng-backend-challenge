const mongoose = require('mongoose');
const Channel = require('./channel');
const Video = require('./video');

const { Schema } = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});


UserSchema.methods.getChannels = function getChannels() {
  return Channel.find({ owner: this._id })
    .exec();
};

UserSchema.methods.createChannel = function createChannel(channelData) {
  return (new Channel(channelData))
    .set('owner', this._id)
    .save();
};

UserSchema.methods.getVideos = function getVideos() {
  return Video.find({ owner: this._id })
    .exec();
};

UserSchema.method.createVideo = function createVideo(videoData) {
  return (new Video(videoData))
    .set('owner', this._id)
    .save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
