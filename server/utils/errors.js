/* eslint-disable max-classes-per-file */
/* eslint-disable no-empty */
const sentry = require('../service/sentry');

class APIError extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

const asyncError = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    try {
      sentry.setExtra('error', err);
      sentry.captureException(err);
    } catch (sentryError) {}
    next(err);
  });
};

module.exports = { APIError, asyncError };
