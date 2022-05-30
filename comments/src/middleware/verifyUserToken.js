const config = require('../config');
const { verifyToken } = require('../utils');
const { UnauthorizedError } = require("../errors");
const { ResponseManager } = require('../utils');

module.exports = async (req, res, next) => {
  if (!req.headers['authorization']) {
    next(
      new UnauthorizedError('Invalid token provided', ResponseManager.HTTP_STATUS.BAD_REQUEST)
    )
  }

  // make a call to the auth service to verify and validate the token
  let response;
  const url = `${config.authServiceUrl}/verify`;
  const token = req.headers.authorization.split(' ')[1];

  try {
    const headers = { Authorization: `Bearer ${token}` };
    response = await verifyToken(url, null, 'POST', headers);
  } catch (e) {
    // if (e.code == 'ECONNREFUSED')
    //   return ResponseManager
    //     .getResponseHandler(res)
    //     .onError(e.message || 'Internal Server error', ResponseManager.HTTP_STATUS.INTERNAL_SERVER_ERROR, e);

    // return ResponseManager
    //   .getResponseHandler(res)
    //   .onError(e.message || 'Invlid token or header parameter', ResponseManager.HTTP_STATUS.BAD_REQUEST, e)
    next(e);return;
  }

  if (response?.status == 'success') {
    const userId = response?.data.id;
    req.body.userId = userId;
    next(); return;
  }

  return ResponseManager
    .getResponseHandler(res)
    .onError('Unauthorized, token verification failed', ResponseManager.HTTP_STATUS.UNAUTHORIZED);
}
