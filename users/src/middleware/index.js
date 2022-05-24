const catchErrors = require('./catchError');
const errorHandler = require('./errorHandler');
const methodNotAllowedHandler = require('./methodNotAllowedHandler');
const notFoundHandler = require('./notFoundHandler');

module.exports = {
  catchErrors,
  errorHandler,
  notFoundHandler,
  methodNotAllowedHandler,
}
