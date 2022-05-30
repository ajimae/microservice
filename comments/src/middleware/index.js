const catchErrors = require('./catchError');
const errorHandler = require('./errorHandler');
const methodNotAllowedHandler = require('./methodNotAllowedHandler');
const notFoundHandler = require('./notFoundHandler');
const verifyUserToken = require('./verifyUserToken');

module.exports = {
  catchErrors,
  errorHandler,
  notFoundHandler,
  methodNotAllowedHandler,
  verifyUserToken
}
