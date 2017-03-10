/**
 * Created by bangbang93 on 14-10-24.
 */
const ConfigModel = require('../model/config');

exports.get = function (key) {
  return ConfigModel.get(key);
};

exports.getAll = function () {
  return ConfigModel.getAll();
};

exports.set = function (key, value) {
  return ConfigModel.set(key, value);
};