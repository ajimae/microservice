const { Router } = require('express');
const {
  catchErrors,
  Authentication,
  methodNotAllowedHandler
} = require('../../middleware');

// inject all dependencies
const { verifyUserToken } = Authentication;
const AuthRepository = require('../../repository/AuthRepository');
const AuthController = require('../../controllers/AuthController');

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

const router = Router();

router.get('/', (req, res) => {
  const message = 'authentication service is up and running';
  return res.status(200).json({
    message,
  });
});

router.post('/generate', catchErrors(authController.generateToken)).all(methodNotAllowedHandler);
router.post('/verify', verifyUserToken, catchErrors(authController.verifyToken)).all(methodNotAllowedHandler);
router.post('/invalidate', catchErrors(authController.invalidateToken)).all(methodNotAllowedHandler);

module.exports = router;
