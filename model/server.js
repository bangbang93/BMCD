/**
 * Created by bangbang93 on 14-10-7.
 */
const mongoose = require('../model').mongoose;

const Schema = new mongoose.Schema({
  java: String,
  name: String,
  host: String,
  port: Number,
  path: String,
  file: String,
  args: [String],
  opt : Mixed
});

const Model = mongoose.model('server', Schema);

exports.getServerByName = function (serverName) {
  return Model.findOne({
    name: serverName
  }).exec();
};

exports.getServerById = function (sid) {
  return Model.findById(sid).exec();
};

exports.getAllServer = function () {
  return Model.find({}).exec();
};

exports.addServer = function (data) {
  return Model.create(data);
};