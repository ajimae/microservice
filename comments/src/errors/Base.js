const HttpStatus = require('http-status-codes');

class BaseError extends Error {
  constructor(message, status = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, data = {}) {
    super(message);

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
    this.data = data;
  }
}

module.exports = BaseError;
