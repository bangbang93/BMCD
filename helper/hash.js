/**
 * Created by ΰ�� on 2015/6/15.
 */
const bcrypt = require('bcrypt');

exports.hashPassword = function (password) {
  return bcrypt.hash(password, 16);
};

exports.compare = function (password, hash) {
  return bcrypt.compare(password, hash);
};