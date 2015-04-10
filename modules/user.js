/**
 * Created by bangbang93 on 14-10-24.
 */
var User = require('../models/user');

exports.login = function (username, password, cb){
    User.getUserByName(username, function (err, user){
        if (err){
            cb(err);
        } else {
            if (!!user){
                if (user['password'] == password){
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
    var users = [];
    User.listUser(function (rows){
        rows.forEach(function (e){
            users.push({
                id: e.id,
                username: e.username,
                isAdmin: e.isAdmin
            })
        });
        cb(users);
    })
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