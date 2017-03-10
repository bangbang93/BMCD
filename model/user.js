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


User.count({}, function (err, count) {
  if (count == 0){
    var user = new User;
    user.username = 'admin';
    user.password = 'c0e024d9200b5705bc4804722636378a';
    user.isAdmin = true;
    user.save(function (err) {
      if (err){
        console.error('初始化用户数据失败');
        throw err;
      } else {
        console.log('初始化用户数据成功，用户名admin,密码admin，请尽快修改')
      }
    })
  }
});