/**
 * Created by bangbang93 on 14-10-7.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bmcd');

exports.getKey = function (key, cb){
    db.get("SELECT * FROM `config` WHERE `key` = '$key'", {
        $key: key
    }, function (err, row){
        if (err){
            return cb(err);
        } else {
            if (!!row){
                cb(null, row['value']);
            } else {
                cb(null, false);
            }
        }
    })
};

exports.setKey = function (key, value, cb){
    db.run("REPLACE INTO `config` (`key`, `value`) VALUES ($key, $value)", {
        $key: key,
        $value: value
    }, function (err){
        if (err){
            cb(err);
        } else {
            cb(null);
        }
    })
};