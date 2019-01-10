const http = require('http');
const forky = require('forky');
const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

app.use((err, req, res, next) => {
  console.log('route error. disconnecting.');
  console.error(err);

  if (res.headersSent) {
    next(err);
  } else {
    res.status(500)
      .send('request error');
  }

  return forky.disconnect();
});

process
  .on('uncaughtException', (err) => {
    console.error(err);
    return forky.disconnect();
  })
  .on('exit', () => console.log('exit'));

const server = http.createServer(app);
server.listen(PORT, () => console.log('Listening on', PORT));

module.exports = server;