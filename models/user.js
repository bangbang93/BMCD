/**
 * Created by bangbang93 on 14-10-7.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bmcd');

exports.getUserById = function (uid, cb){
    db.get("SELECT * FROM `user` WHERE `uid` = '$uid'",{
        $uid: uid
    }, function (err, row){
        if (err){
            cb(err);
        } else {
            cb(null, row);
        }
    })
};

exports.addUser = function (username, password){
    db.run("INSERT INTO `user` (`username`, `password`) VALUES ('$username', '$password'", {
        $username: username,
        $password: password
    }, function (err){
        if (err){
            cb(err);
        } else {
            cb(null);
        }
    });
};

exports.deleteManage = function (uid, sid, cb){
    db.get("SELECT `manage` FROM `user` WHERE `uid` = '$uid'", {
        $uid: uid
    }, function (err, row){
        if (err){
            return cb(err);
        } else {
            var manage = row['manage'];
            manage = manage.split(',');
            var index = manage.indexOf(sid);
            if (index >= 0){
                manage.splice(index, 1);
                manage = manage.toString();
                db.run("UPDATE `user` SET `manage` = '$manage' WHERE `uid` = '$uid'", {
                    $manage: manage,
                    $uid: uid
                }, function (err){
                    if (err){
                        cb(err);
                    } else {
                        cb(null, true);
                    }
                })
            } else {
                cb(null, false);
            }
        }
    })
};

exports.addManage = function (uid, sid, cb){
    db.get("SELECT `manage` FROM `user` WHERE `uid` = '$uid'", {
        $uid: uid
    }, function (err, row){
        if (err) {
            return cb(err);
        } else {
            var manage = row['manage'];
            manage = manage.split(',');
            var index = manage.indexOf(sid);
            if (index <= 0){
                manage.push(sid);
                manage = manage.toString();
                db.run("UPDATE `user` SET `manage` = '$manage' WHERE `uid` = '$uid'", {
                    $manage: manage,
                    $uid: uid
                }, function (err){
                    if (err){
                        cb(err);
                    } else {
                        cb(null ,true);
                    }
                })
            } else {
                cb(null, false);
            }
        }
    })
};