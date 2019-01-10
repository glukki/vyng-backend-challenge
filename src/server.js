const http = require('http');
const forky = require('forky');
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const { MONGO_USER, MONGO_PASSWORD, MONGO_URI } = process.env;

function expressErrorHandler(err, req, res, next) {
  console.log('route error. disconnecting.');
  console.error(err);

  if (res.headersSent) {
    next(err);
  } else {
    res.status(500)
      .send('request error');
  }

  return forky.disconnect();
}

function createApp() {
  const app = express();

  // hook up request handlers
  app.get('/', (req, res) => res.send('Hello world!'));

  // error handling middleware should go last
  app.use(expressErrorHandler);

  return app;
}

async function start() {
  process
    .on('uncaughtException', (err) => {
      console.error(err);
      return forky.disconnect();
    })
    .on('exit', () => console.log('exit'));

  await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`, {
    useNewUrlParser: true,
  });

  const app = createApp();
  const server = http.createServer(app);
  server.listen(PORT, () => console.log('Listening on', PORT));

  return server;
}

module.exports = start();
