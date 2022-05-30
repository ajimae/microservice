const autoBind = require('auto-bind-inheritance');
const { ResponseManager } = require('../utils');

class BaseController {
  constructor() {
    autoBind(this);
    if (new.target === BaseController) {
      throw new TypeError("Cannot construct BaseController instances directly");
    }
    this.responseManager = ResponseManager;
  }
}

module.exports = BaseController;
