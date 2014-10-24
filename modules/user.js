/**
 * Created by bangbang93 on 14-10-24.
 */
var User = require('../models/user');

exports.login = function (username, password, cb){
    User.getUserByName(username, function (err, row){
        if (err){
            cb(err);
        } else {
            if (!!row){
                console.log(row);
                if (row['password'] == password){
                    cb(null, {
                        uid: row['id'],
                        isAdmin: row['isAdmin']
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