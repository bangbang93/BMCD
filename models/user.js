/**
 * Created by bangbang93 on 14-10-7.
 */
var User = require('../model').UserModel;

exports.getUserByName = function (username, cb){
  User.findOne({
    username: username
  }, cb)
};

exports.addUser = function (username, password, cb){
  var user = new User();
  user.username = username;
  user.password = password;
  user.isAdmin = false;
  user.save(function (err){
      cb(err);
  })
};

exports.listUser = function (cb){
    User.find({}, cb);
};
