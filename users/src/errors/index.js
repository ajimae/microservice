const BadRequestError = require('./BadRequest');
const ConflictError = require('./ConflictError');
const InternalServerError = require('./InternalServer');
const InvalidPayloadError = require('./InvalidPayload');
const MethodNotAllowedError = require('./MethodNotAllowed');
const NotImplementedError = require('./NotImplemented');
const ResourceNotFoundError = require('./ResourceNotFound');
const ServiceUnavailableError = require('./ServiceUnavailable');

module.exports = {
  BadRequestError,
  ConflictError,
  InternalServerError,
  InvalidPayloadError,
  MethodNotAllowedError,
  NotImplementedError,
  ResourceNotFoundError,
  ServiceUnavailableError
};
