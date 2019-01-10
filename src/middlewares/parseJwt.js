function parseJwt(req, res, next) {
  // TODO: use real JWT
  // TODO: use passport
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split('Bearer ')[1];
  if (!token) {
    return res.status(400)
      .send('Authorization header malformed');
  }

  req.token = JSON.parse(authHeader);
  return next();
}

module.exports = parseJwt;
