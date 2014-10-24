/**
 * Created by bangbang93 on 14-10-7.
 */
var Server = require('../model').Server;

exports.getServerByName = function (serverName, cb){
    Server.findOne({
        where:{
            serverName: serverName
        }
    }).error(function (err){
        cb(err);
    }).success(function (row){
        if (!!row){
            cb(null, row);
        } else {
            cb(null, {});
        }
    })
};

exports.getServerList = function (cb){
    Server.findAll().error(function (err){
        cb(err);
    }).success(function (result){
        cb(null, result);
    })
};