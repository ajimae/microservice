const { UnauthorizedError } = require('../errors');
/**
 * Handle 404 errors
 * @param {Object} req - Incoming request
 * @param {Object} res - Server response
 */
module.exports = (req, res, next) => {
  throw new UnauthorizedError(
    `Unauthorized, you don't have the complete permission to access this resource, try signing in and try again.`,
  );
};
