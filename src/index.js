const forky = require('forky');

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

forky({
  path: `${__dirname}/server.js`,
  workers: CONCURRENCY,
});
