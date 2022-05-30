const { Authentication } = require('../middleware')

class AuthRepository {
  constructor() { }

  async generateToken(data) {
    return Authentication.authenticate(data);
  }

  async verifyToken(token) {
    throw new Error('Method Not Implemented.');
  }

  async invalidateToken(token) {
    throw new Error('Method Not Implemented.');
  }
}

module.exports = AuthRepository; 
