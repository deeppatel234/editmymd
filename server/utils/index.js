const { sentry } = require('../service');

const asyncError = (fn, config = {}) => (req, res, next) => {
  const { message } = config;
  Promise.resolve(fn(req, res, next)).catch(err => {
    sentry.setExtra('error', err);
    sentry.captureException(err);
    if (message) {
      next(new Error(message));
    } else {
      next(err);
    }
  });
};

module.exports = {
  asyncError,
};
