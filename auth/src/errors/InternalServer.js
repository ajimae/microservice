const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class InternalServerError extends BaseError {
  constructor(
    message = "Internal server error.",
    status = HttpStatus.StatusCodes.SERVICE_UNAVAILABLE,
    data
  ) {
    super(message, status, data);
    this.name = "InternalServerError";
  }
}

module.exports = InternalServerError;
