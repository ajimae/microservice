const { Router } = require('express');
const {
  catchErrors,
  methodNotAllowedHandler
} = require('../../middleware');

// inject all dependencies
const UserModel = require('../../models');
const UserRepository = require('../../repository/UserRepository');
const UserController = require('../../controllers/UserController');

const userRepository = new UserRepository(UserModel);
const userController = new UserController(userRepository);

const router = Router();

router.get('/', (req, res) => {
  const message = 'user service is up and running';
  return res.status(200).json({
    message,
  });
});

router.post('/user/login', catchErrors(userController.login)).all(methodNotAllowedHandler);
router.post('/user/signup', catchErrors(userController.signup)).all(methodNotAllowedHandler);
router.get('/user', catchErrors(userController.getUserData)).all(methodNotAllowedHandler);
router.get('/users', catchErrors(userController.getUsersData)).all(methodNotAllowedHandler);
router.patch('/user/:id', catchErrors(userController.updateUserData)).all(methodNotAllowedHandler);
router.patch('/user', catchErrors(userController.suspendUser)).all(methodNotAllowedHandler);
router.delete('/user/:id', catchErrors(userController.removeUser)).all(methodNotAllowedHandler);

module.exports = router;
