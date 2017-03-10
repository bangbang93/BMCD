/**
 * Created by bangbang93 on 14-10-24.
 */
var User = require('./user');
var md5 = require('./md5');

exports.login = function (username, password, cb){
    User.getUserByName(username, function (err, user){
        if (err){
            cb(err);
        } else {
            if (!!user){
                if (user['password'] == md5(username + password)){
                    cb(null, {
                        uid: user['id'],
                        isAdmin: user['isAdmin']
                    });
                } else {
                    cb(null, false);
                }
            } else {
                cb(null, false);
            }
        }
    })
};

exports.listUser = function (cb){
    User.listUser(cb);
};

exports.changePassword = function (username, newPassword, cb){
    User.getUserByName(username, function (err, user){
        if (err){
            cb(err);
        } else {
            user.password = newPassword;
            user.save();
            cb();
        }
    })
};

exports.addUser = function (username, password) {
    User.addUser(username, md5(username + password), cb);
};