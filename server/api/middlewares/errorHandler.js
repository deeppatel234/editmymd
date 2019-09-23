const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: err.message,
  });
};

module.exports = errorHandler;
