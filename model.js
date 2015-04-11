/**
 * Created by bangbang93 on 14-10-24.
 */
var mongoose = require('mongoose');
var Config = require('./config');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

mongoose.connect('mongodb://' + Config.db.host + '/' + Config.db.db);

var ConfigSchema = new mongoose.Schema({
  key: String,
  value: Mixed
});

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  servers: [{
    type: ObjectId,
    ref: 'server'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

var ServerSchema = new mongoose.Schema({
  name: String,
  host: String,
  port: Number,
  path: String,
  file: String,
  args: [String],
  opt: Mixed
});

exports.ServerModel = mongoose.model('server', ServerSchema);
exports.ConfigModel = mongoose.model('config', ConfigSchema);
exports.UserModel = mongoose.model('user', UserSchema);