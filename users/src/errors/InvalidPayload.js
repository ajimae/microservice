const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class InvalidPayloadError extends BaseError {
  constructor(message = "Provided payload is invalid", status = HttpStatus.StatusCodes.BAD_REQUEST, data) {
    super(message, status, data);
    this.name = "InvalidPayloadError";
  }
}

module.exports = InvalidPayloadError;
