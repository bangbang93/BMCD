/**
 * Created by bangbang93 on 14-10-7.
 */
const mongoose = require('../model').mongoose;
const Mixed = mongoose.Schema.Types.Mixed;

const Schema = new mongoose.Schema({
  java: String,
  name: {
    type: String,
    unique: true,
  },
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

exports.listAll = function () {
  return Model.find({}).exec();
};

exports.listByIds = function (ids) {
  return Model.find({
    _id: [ids]
  })
};

exports.addServer = function (data) {
  return Model.create(data);
};