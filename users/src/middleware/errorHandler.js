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

  // if (err.name || err.error) {
  //   if (err.name === "ValidationError" || (err.error && err.error.name === "ValidationError")) {
  //     return ResponseManager.getResponseHandler(res).onError(
  //       err.name || err.error.name,
  //       HttpStatus.StatusCodes.BAD_REQUEST,
  //       err.message || err.error.toString(),
  //       err.errors || err.error.details
  //     );
  //   }
  //   return ResponseManager.getResponseHandler(res).onError(
  //     err.name,
  //     err.status,
  //     err.message,
  //     err.data
  //   );
  // }

  const errorMessage = process.env.NODE_ENV === "production" ? "Something bad happened!" : err.message;
  const errorData = process.env.NODE_ENV === "production" ? {} : err.data || err;
  return ResponseManager.getResponseHandler(res).onError(
    "InternalServerError",
    err.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
    errorMessage,
    errorData
  );
};
