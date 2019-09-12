const { validateToken } = require('../../service');

const getTokenFromRequest = req => {
  // get token from authorization header
  const { authorization } = req.headers;
  if (authorization) {
    return authorization;
  }
  return false;
};

const isAuth = async (req, res, next) => {
  const token = getTokenFromRequest(req);
  try {
    const { userId } = validateToken(token);
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'token not authorized',
    });
  }
};

module.exports = isAuth;
