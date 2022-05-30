const httpStatus = require('http-status-codes');

const BasicResponse = {
  success: false,
  statusCode: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
  message: "",
};

/**
 * Handles API responses
 */
class ResponseManager {
  static get HTTP_STATUS() {
    return httpStatus.StatusCodes;
  }

  static getResponseHandler(res) {
    return {
      onSuccess(message, code, data) {
        return ResponseManager.respondWithSuccess(res, message, code, data);
      },
      onError(errorMessage, errorCode, data) {
        if (data?.config?.headers) delete data.config.headers;
        return ResponseManager.respondWithError(
          res,
          errorMessage,
          errorCode,
          data,
        );
      },
    };
  }

  static generateHATEOASLink(link, method, rel) {
    return {
      link,
      method,
      rel,
    };
  }

  static respondWithSuccess(res, message = "success", code = ResponseManager.HTTP_STATUS.OK, data = {}) {
    const response = { ...BasicResponse };
    response.success = true;
    response.message = message;
    response.data = data;
    response.statusCode = code;
    return res.status(code).json(response);
  }

  static respondWithError(
    res,
    message = "Unknown error",
    errorCode = ResponseManager.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    data = {},
  ) {
    const response = { ...BasicResponse };
    response.success = false;
    response.message = message;
    response.statusCode = errorCode;
    response.data = data;
    return res.status(errorCode).json(response);
  }
}

module.exports = ResponseManager;
