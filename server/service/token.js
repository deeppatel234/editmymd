const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = userId => {
  const payload = {
    userId,
  };

  return jwt.sign(payload, config.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '30 days',
  });
};

const validateToken = token => {
  return jwt.verify(token, config.jwtSecret);
};

module.exports = {
  generateToken,
  validateToken,
};
