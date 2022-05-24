
const Ncrypt = require('ncrypt-js');

/**
 * @description class Ncrypt
 * @param secret
 * 
 * @returns {string} hash
 */
const ncrypt = new Ncrypt(process.env.HASH_SECRET);

module.exports = ncrypt;
