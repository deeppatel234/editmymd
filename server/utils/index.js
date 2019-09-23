const asyncError = (fn, config = {}) => (req, res, next) => {
  const { message } = config;
  Promise.resolve(fn(req, res, next)).catch(err => {
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
