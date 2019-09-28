const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    statusCode,
    statusText: err.statusText,
    message,
  });
};

module.exports = errorHandler;
