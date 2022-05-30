const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class ServiceUnavailableError extends BaseError {
  constructor(
    message = "Sorry, the server is too busy to process your request at the moment.",
    status = HttpStatus.StatusCodes.SERVICE_UNAVAILABLE,
    data
  ) {
    super(message, status, data);
    this.name = "ServiceUnavailableError";
  }
}

module.exports = ServiceUnavailableError;
