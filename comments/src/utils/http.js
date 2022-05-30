const axios = require('axios');

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
    throw e
  }
}
