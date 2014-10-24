/**
 * Created by bangbang93 on 14-10-7.
 */
var Config = require('../model').Config;

exports.get = function (key, cb){
    Config.find({
        where: {
            key: key
        }
    }).success(function (row){
        if (!!row){
            cb(row);
        } else {
            cb(null);
        }
    })
};

exports.set = function (key, value, cb){
    Config.find(key, function (row){
        if (!!row){
            Config.update({
                value: value
            }, {
                key: key
            }).error(function (err){
                cb(err);
            }).success(function (){
                cb();
            })
        } else {
            Config.create({
                key: key,
                value: value
            }).error(function (err){
                cb(err);
            }).success(function (){
                cb();
            })
        }
    })
};

