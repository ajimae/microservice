const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class BadRequestError extends BaseError {
  constructor(message = "Bad request", status = HttpStatus.StatusCodes.BAD_REQUEST, data) {
    super(message, status, data);
    this.name = "BadRequestError";
  }
}

module.exports = BadRequestError;
