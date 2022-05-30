const { ResponseManager } = require('../utils');
const BaseController = require('./BaseController')

class AuthController extends BaseController {
  constructor(authRepository) {
    super();
    this.authRepository = authRepository;
  }

  async generateToken(req, res) {
    const token = await this.authRepository.generateToken(req.body);
    return ResponseManager.successResponse(res, ResponseManager.HTTP_STATUS.OK, 'Authorization token generated successfully', { token });
  }

  async verifyToken(req, res) {
    const { decoded } = res.locals;

    res.header('Authorization', `Bearer ${decoded.token}`);
    return ResponseManager.successResponse(res, ResponseManager.HTTP_STATUS.OK, 'Bearer authorized', decoded);
  }

  async invalidateToken(req, res) { }
}

module.exports = AuthController;
