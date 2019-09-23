const isAuth = require('./isAuth');
const attachCurrentUser = require('./attachCurrentUser');
const errorHandler = require('./errorHandler');

module.exports = {
  isAuth,
  errorHandler,
  attachCurrentUser,
};
