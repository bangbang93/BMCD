/**
 * Created by bangbang93 on 14-10-7.
 */
var User = require('../model').User;

exports.getUserByName = function (username, cb){
    User.find({
        where:{
            username: username
        }
    }).error(function (err){
        cb(err)
    }).success(function (row){
        if (row){
            cb(null, row);
        } else {
            cb();
        }
    });
};

exports.addUser = function (username, password, cb){
    var user = new User();
    user.username = username;
    user.password = password;
    user.save(function (err){
        cb(err);
    })
};

exports.listUser = function (cb){
    User.findAll({}).success(function (rows){
        cb(rows);
    })
};
