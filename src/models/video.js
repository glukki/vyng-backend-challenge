const mongoose = require('mongoose');

const { Schema } = mongoose;

const VideoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
