/**
 * Error handling middleware
 */
const { ResponseManager, logger } = require('../utils')

module.exports = async (err, req, res, next) => {
  if (err.status && err.status >= 500 /* || err.code == 'ECONNREFUSED'*/) {
    logger.error("---------------START OF ERROR(S)---------------------");
    logger.error(`An error occurred for request ${req.id}`, err);
    logger.error("---------------END OF ERROR(S)-----------------------");
  }

  const errorMessage = err.message ? err.message : 'Something went wrong!'
  const errorData = err.data ? err.data : err;
  return ResponseManager.getResponseHandler(res)
    .onError(
      errorMessage,
      err.status || ResponseManager.HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorData
    );
};
