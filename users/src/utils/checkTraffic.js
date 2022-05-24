const toobusy = require('toobusy-js');
const { ServiceUnavailableError } = require('../errors')

module.exports = (req, res, next) => {
  if (toobusy()) {
    throw new ServiceUnavailableError();
  }
  next();
}
