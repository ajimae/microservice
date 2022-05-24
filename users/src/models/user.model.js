const mongoose = require('mongoose');

const { ncrypt, logger } = require('../utils')

const userSchema = new mongoose.Schema({
  contact: {
    firstName: {
      type: String,
      required: true,
      unique: false
    },
    lastName: {
      type: String,
      required: true,
      unique: false
    },
    email: {
      index: true,
      type: String,
      unique: true,
      required: true,
    },
    username: {
      index: true,
      type: String,
      required: true,
      default: this.firstName + this.lastName,
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    select: false
  },
  profilePictureUrl: {
    type: String,
    required: true,
    default: 'https://ava.tr/img/user/imageUrl',
    unique: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['regular', 'admin'],
    default: 'regular',
    unique: false
  },
  isSuspended: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: false,
    unique: false
  }
},
  { timestamps: true }
);

/**
 * @description encrypt and store user password
 * @param save, callback
 */
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hash = ncrypt.encrypt(user.password);
    user.password = hash;

    next()
  } catch (e) {
    // log error here
    logger.error('Unable to register user', e);
    next(e)
    // throw Error('An error occurred while trying to signup user');
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
