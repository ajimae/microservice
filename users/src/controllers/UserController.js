const BaseController = require('./BaseController')

class UserController extends BaseController {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async login(req, res) {
    const response = await this.userRepository.login(req.body);

    if (!response) {
      return this.responseManager
        .getResponseHandler(res)
        .onError('Invalid email or password', this.responseManager.HTTP_STATUS.BAD_REQUEST, response);
    }

    const data = response.toObject();
    delete data.password;

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Login successful', this.responseManager.HTTP_STATUS.OK, data);
  }

  async signup(req, res) {
    const data = await this.userRepository.signup(req.body);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Signup successful', this.responseManager.HTTP_STATUS.CREATED, data);
  }

  async getUserData(req, res) {
    const data = await this.userRepository.getUserData(req.body);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully fetch the user data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async getUsersData(req, res) {
    const data = await this.userRepository.getUsersData();

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully fetch all users data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async updateUserData(req, res) {
    const id = req.params.id;
    const userData = req.body;
    const data = await this.userRepository.updateUserData({ id, userData });

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully updated the user data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async suspendUser(req, res) {
    const data = await this.userRepository.suspendUser(req.body);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully updated the user data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async removeUser(req, res) {
    const id = req.params.id;
    const data = await this.userRepository.removeUser(id);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully removed the user data', this.responseManager.HTTP_STATUS.OK, data);
  }
}

module.exports = UserController;
