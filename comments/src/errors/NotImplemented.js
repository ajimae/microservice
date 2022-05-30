const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class NotImplementedError extends BaseError {
  constructor(
    message = "The requested resource/method has not been implemented",
    status = HttpStatus.StatusCodes.NOT_IMPLEMENTED,
    data
  ) {
    super(message, status, data);
    this.name = "NotImplementedError";
  }
}

module.exports = NotImplementedError;
