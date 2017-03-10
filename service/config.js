/**
 * Created by bangbang93 on 14-10-24.
 */
var Config = require('./config');

exports.get = function (key, cb){
    if (!cb){
        cb = function (){};
    }
    Config.getAll(function (err, config){
        if (err){
            cb(err);
        } else {
            cb(null, config[key]);
        }
    })
};

exports.getAll = function (cb){
    if (!cb){
        cb = function (){};
    }
    Config.getAll(function (err, config){
        cb(err, config);
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