const HttpStatus = require('http-status-codes');
const BaseError = require('./Base');

class ConflictError extends BaseError {
  constructor(message = "Resource already exists", status = HttpStatus.StatusCodes.CONFLICT, data) {
    super(message, status, data);
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
