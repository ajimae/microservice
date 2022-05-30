const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class MethodNotAllowedError extends BaseError {
  constructor(message = "Method not allowed", status = HttpStatus.StatusCodes.METHOD_NOT_ALLOWED, data) {
    super(message, status, data);
    this.name = "MethodNotAllowedError";
  }
}

module.exports = MethodNotAllowedError;
