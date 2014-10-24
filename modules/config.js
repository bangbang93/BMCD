/**
 * Created by bangbang93 on 14-10-24.
 */
var Config = require('../models/config');

exports.get = function (key, cb){
    if (!cb){
        cb = function (){};
    }
    Config.get(key, function (row){
        if (!!row){
            cb(row.value);
            return row.value;
        } else {
            cb(null);
            return null;
        }
    })
};

exports.set = function (key, value, cb){
    if (!cb){
        cb = function (){};
    }
    Config.set(key, value, function (err){
        cb(err);
    })
};