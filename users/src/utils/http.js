const axios = require('axios');
const { ResponseManager } = require('./response');
const { BadRequestError, InternalServerError } = require('../errors');

// make a call to user service
module.exports = async (url, data, method = 'GET', headers = {}) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        ...headers
      },
    });

    return response?.data
  } catch (e) {
    if (e.status >= 500) {
      throw new InternalServerError(
        'Internal server error',
        e.status || ResponseManager.HTTP_STATUS.INTERNAL_SERVER_ERROR,
        e.data || e
      );
    }
    throw new BadRequestError(
      e.message || 'Unable to generate token',
      e.status || ResponseManager.HTTP_STATUS.BAD_REQUEST,
      e.data || e
    );
  }
}
