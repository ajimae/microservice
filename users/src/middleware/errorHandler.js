/**
 * Error handling middleware
 */
const HttpStatus = require('http-status-codes');
const { ResponseManager, logger } = require('../utils')

// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, next) => {
  if (err.status && err.status >= 500) {
    logger.error("---------------START OF ERROR(S)---------------------");
    logger.error(`An error occurred for request ${req.id}`, err);
    logger.error("---------------END OF ERROR(S)-----------------------");
  }

  const errorMessage = err.message ? err.message : 'Something went wrong!'
  const errorData = err.data ? err.data : err;
  return ResponseManager.getResponseHandler(res).onError(
    errorMessage,
    err.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
    errorData
  );
};
