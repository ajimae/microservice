const { BadRequestError } = require('../errors');
/**
 * Handle 404 errors
 * @param {Object} req - Incoming request
 * @param {Object} res - Server response
 */
module.exports = (req, res, next) => {
  next(
    new BadRequestError(
      'Bad request error'
    )
  );
};
