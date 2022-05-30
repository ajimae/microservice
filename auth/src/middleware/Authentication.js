const axios = require('axios');
const { http } = require('../utils');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const config = require('../config');
const { ResponseManager } = require('../utils');
const { UnauthorizedError } = require('../errors');

/**
 * @description jwt base authentication class
 * 
 * @method authenticate
 * @method verifyToken
 * @method verifyUserToken
 */
class Authentication {
  /**
   * @description authenicate user token
   * 
   * @param user object { id, email, username, isSuspended, role }
   * 
   * @returns jwt
   */
  static authenticate = async ({ id, email, username, isSuspended, role }) => {
    return jwt.sign({ id, email, username, isSuspended, role },
      config.jwtSecret, { expiresIn: config.expiresIn });
  }

  /**
   * @description verify jwt token
   * 
   * @param token
   * 
   * @return return decoded payload
   */
  static verifyToken = (token) => {
    const _decoded = {};

    try {
      _decoded.payload = jwt.verify(token, config.jwtSecret);
    } catch (error) {
      _decoded.error = error
    }

    return _decoded;
  }

  /**
   * @description verify user token
   * 
   * @param req
   * @param res
   * @parem next
   * 
   * @return { user payload | error }
   */
  static verifyUserToken = async (req, res, next) => {
    if (!req.headers.authorization) {
      return ResponseManager
        .errorResponse(res, ResponseManager.HTTP_STATUS.BAD_REQUEST, 'invalid token provided');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.verifyToken(token);


    if (decoded.error) {
      return ResponseManager
        .errorResponse(res, ResponseManager.HTTP_STATUS.BAD_REQUEST, 'Invalid token or header parameter', decoded.error);
    }

    if (!decoded.payload) {
      return ResponseManager
        .errorResponse(res, ResponseManager.HTTP_STATUS.BAD_REQUEST, 'Invalid token or header parameter', decoded.error);
    }

    const { username } = decoded.payload;
    // make a call to user service
    // const { data } = await axios({
    //   url: `${config.userServiceUrl}/user`,
    //   method: 'GET',
    //   data: {
    //     username
    //   }
    // })

    const data = await http(`${config.userServiceUrl}/user`, { username }, 'GET');

    if (data && data.data) {
      res.locals.decoded = decoded.payload;
      next();return;
    }

    next(data);

    // const { data } = response;

    // if (data.data) {
    //   res.locals.decoded = decoded.payload;
    //   next();
    // } else {
    //   next(
    //     new UnauthorizedError('Bearer details of the provided token was not found', HttpStatus.StatusCodes.UNAUTHORIZED)
    //   )
    // }
  }
}

module.exports = Authentication
