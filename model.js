/**
 * Created by bangbang93 on 14-10-24.
 */
var mongoose = require('mongoose');
var Config = require('./config');
mongoose.connect('mongodb://' + Config.db.host + '/' + Config.db.db);
var ObjectId = mongoose.ObjectId;

var ConfigSchema = new mongoose.Schema({
  key: String,
  value: String
});

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  servers: [ObjectId]
});

var ServerSchema = new mongoose.Schema({
  name: String,
  host: String,
  port: Number,
  path: String,
  file: String,
  opt: Object
});

exports.ConfigModel = mongoose.model('config', ConfigSchema);
exports.UserModel = mongoose.model('user', UserSchema);
exports.ServerModel = mongoose.model('server', ServerSchema);