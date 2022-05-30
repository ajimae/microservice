const { ncrypt, formatData } = require('../utils');

class UserRepository {
  constructor(User) {
    this.User = User;
  }

  async login({ email, password }) {
    const user = await this.User.findOne({
      'contact.email': email
    }).select('+password');

    if (user) {
      const hash = ncrypt.decrypt(user.password);
      if (hash !== password) {
        return null;
      }
    }

    // user with the provided credentials wasn't found.
    return user;
  }

  async signup(userData) {
    return this.User({ ...userData }).save();
  }

  /**
   * @description get user data
   * 
   * @param {*} userData 
   * @returns user document
   */
  async getUserData(userData) {
    const str = Object.keys(userData)[0];
    const key = `contact.${str}`;

    return this.User.findOne({ [key]: userData[str] }).select('-password');
  }

  /**
   * @description get all users
   * 
   * @returns user documents
   */
  async getUsersData() {
    return this.User.find({});
  }

  /**
   * @example
   * 
   * format of data to be sent for update
   * {
   *   id: string,
   *   userData: {
   *     firstName: string,
   *     lastName: string,
   *     username: string
   *     role: string,
   *     password: string
   *     ...otherUpdateParams
   *   }
   * } 
   * 
   * @description user details update function 
   * 
   * @param {*} id 
   * @param {*} userData
   * 
   * @returns updated user document
   */
  async updateUserData({ id, userData }) {
    const data = formatData(userData);
    const query = { _id: id };

    return this.User.findOneAndUpdate(query, { $set: { ...data } }, { new: true });
  }

  async suspendUser(userData) {
    const str = Object.keys(userData)[0];
    const key = `contact.${str}`;
    const query = { [key]: userData[str] };

    return this.User.findOneAndUpdate(query, { isSuspended: true }, { new: true });
  }

  async removeUser(id) {
    const query = { _id: id };
    return this.User.findOneAndDelete(query);
  }
}

module.exports = UserRepository
