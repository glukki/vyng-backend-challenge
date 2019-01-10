const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  writeConcern: {
    w: 'majority',
    wtimeout: 1000,
  },
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;
