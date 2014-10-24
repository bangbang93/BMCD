/**
 * Created by bangbang93 on 14-10-7.
 */
var Server = require('../model').Server;
var User = require('../model').User;

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

exports.getServerList = function (uid, cb){
    Server.findAll({
        include: [{
            model:User
        }]
    }).error(function (err){
        cb(err);
    }).success(function (result){
        cb(null, result);
    })
};

exports.addServer = function (data, cb){
    Server.create({
        serverName: data.serverName,
        host: data.host,
        port: data.port,
        path: data.path
    }).error(function (err){
        cb(err);
    }).success(function (){
        cb(null);
    })
};