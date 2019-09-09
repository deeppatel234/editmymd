const _has = require('lodash/has');
const _difference = require('lodash/difference');

const { removeUndefinedNull } = require('./utils');

const { getUser } = require('../model/user');

const verifyAccessToken = async token => {
  try {
    const user = await getUser(token);
    if (user) {
      return {
        user,
        isValid: true,
      };
    }
    return {
      isValid: false,
    };
  } catch (err) {
    return {
      isValid: false,
    };
  }
};

const getTokenFromRequest = req => {
  // get token from authorization header
  const { authorization } = req.headers;
  if (authorization) {
    return authorization;
  }
  return false;
};

const auth = async (req, res, next) => {
  const token = getTokenFromRequest(req);
  try {
    const { isValid, user } = await verifyAccessToken(token);
    if (isValid) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        message: 'token not authorized',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const hasData = data => {
  return (req, res, next) => {
    const { body } = req;
    removeUndefinedNull(body);
    const hasKeys = data.every(key => {
      return Array.isArray(key)
        ? key.some(k => _has(body, k))
        : _has(body, key);
    });
    if (hasKeys) {
      next();
    } else {
      res.status(500).json({
        message: `missing params : ${_difference(data, Object.keys(body))}`,
      });
    }
  };
};

module.exports = {
  auth,
  hasData,
};
