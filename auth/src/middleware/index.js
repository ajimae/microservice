const catchErrors = require('./catchError');
const errorHandler = require('./errorHandler');
const methodNotAllowedHandler = require('./methodNotAllowedHandler');
const notFoundHandler = require('./notFoundHandler');
const Authentication = require('./Authentication');

module.exports = {
  catchErrors,
  errorHandler,
  notFoundHandler,
  methodNotAllowedHandler,
  Authentication
}
