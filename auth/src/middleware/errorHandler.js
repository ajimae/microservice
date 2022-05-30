/**
 * Error handling middleware
 */
const { ResponseManager, logger } = require('../utils')

// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, next) => {
  if (err.status && err.status >= 500) {
    logger.error("---------------START OF ERROR(S)---------------------");
    logger.error(`An error occurred for request ${req.id}`, err);
    logger.error("---------------END OF ERROR(S)-----------------------");
  }

  const errorData = err;
  const errorMessage = err.message ? err.message : 'Something went wrong!'

  return ResponseManager
    .errorResponse(res, err.status || ResponseManager.HTTP_STATUS.INTERNAL_SERVER_ERROR, errorMessage, errorData);
};
