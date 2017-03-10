/**
 * Created by bangbang93 on 14-10-24.
 */
const mongoose = require('mongoose');
const Config = require('./config/database');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed    = mongoose.Schema.Types.Mixed;

mongoose.connect(`mongodb://${Config.mongodb.host}/${Config.mongodb.database}`);

const ConfigSchema = new mongoose.Schema({
  key  : String,
  value: Mixed
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  servers : [{
    type: ObjectId,
    ref : 'server'
  }],
  isAdmin : {
    type   : Boolean,
    default: false
  }
});

const ServerSchema = new mongoose.Schema({
  java: String,
  name: String,
  host: String,
  port: Number,
  path: String,
  file: String,
  args: [String],
  opt : Mixed
});

exports.ServerModel = mongoose.model('server', ServerSchema);
exports.ConfigModel = mongoose.model('config', ConfigSchema);
exports.UserModel = mongoose.model('user', UserSchema);