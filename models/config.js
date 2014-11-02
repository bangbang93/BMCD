/**
 * Created by bangbang93 on 14-10-7.
 */
var Config = require('../model').Config;

exports.getAll = function (cb){
    var config = {};
    Config.findAll({}).success(function (rows){
        rows.forEach(function (e){
            config[e.key] = e.value;
        });
        cb(null, config);
    })
};

exports.set = function (key, value, cb){
    Config.findOne({
        where:{
            key:key
        }
    }).success(function (row){
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
    });
};

