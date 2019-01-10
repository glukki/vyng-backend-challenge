/**
 * Reject request if user not authorized
 */
function requireAuthentication(req, res, next) {
  const { user } = req;

  if (user && user._id) {
    return next();
  }

  return res.sendStatus(403);
}

module.exports = requireAuthentication;
