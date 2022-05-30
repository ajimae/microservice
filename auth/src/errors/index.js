const BadRequestError = require('./BadRequest');
const InternalServerError = require('./InternalServer');
const MethodNotAllowedError = require('./MethodNotAllowed');
const ResourceNotFoundError = require('./ResourceNotFound');
const ServiceUnavailableError = require('./ServiceUnavailable');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  BadRequestError,
  InternalServerError,
  MethodNotAllowedError,
  ResourceNotFoundError,
  ServiceUnavailableError,
  UnauthorizedError
};
