const { ResourceNotFoundError } = require('../errors');
/**
 * Handle 404 errors
 * @param {Object} req - Incoming request
 * @param {Object} res - Server response
 */
module.exports = (req, res, next) => {
  next(
    new ResourceNotFoundError(
      `You have tried to access an API endpoint (${req.url}) with a '${req.method}' method that does not exist.`,
      404
    )
  );
};
