const httpStatus = require('http-status-codes');

const logger = require('./logger');

module.exports = (error, req, res, next) => {
  logger.error('An unknown error occurred ', error);
  if (process.env.NODE_ENV !== 'production') {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something bad happened',
      error: error.message,
      stack: error.stack,
    });
  }
  return res.status(error.status || httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Something bad happened. Please contact us for support.',
  });
};
