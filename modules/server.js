/**
 * Created by bangbang93 on 14-8-20.
 */
var debug = require('debug')('BMCD');
var fs = require('fs');
var async = require('async');
var path = require('path');
var mcProtocol = require('minecraft-protocol');
var Server = require('../models/server');
var Process = require('./process');

exports.listServer = function (uid, cb){
    Server.getServerList(uid, function (err, result){
        if (err){
            return cb(err);
        } else {
            return cb(null, result);
        }
    })
};

exports.getServerInfo = function (servername, cb){
    var serverInfo = {
        name: servername
    };
    Server.getServerByName(servername, function (err, server){
        if (err){
            return cb(err);
        } else {
            serverInfo.host = server['host'];
            serverInfo.port = server['port'];
            mcProtocol.ping({
                host: server['host'],
                port: server['port']
            }, function (err, result){
                if (err){
                    serverInfo.path = server.path;
                    serverInfo.maxPlayers = 0;
                    serverInfo.playerCount = 0;
                    serverInfo.version = '0.0';
                    serverInfo.status = 'failed'
                } else {
                    serverInfo.path = server.path;
                    serverInfo.maxPlayers = result.players.max;
                    serverInfo.playerCount = result.players.online;
                    serverInfo.version = result.version;
                    serverInfo.status = 'success'
                }
                cb(null, serverInfo);
            })
        }
    })
};

exports.createServer = function (serverName, host, port, path, cb){
    fs.readdir(path, function (err, files){
        if (err){
            cb(err)
        } else {
            Server.addServer({
                serverName: serverName,
                host: host,
                port: port,
                path: path
            }, function (err){
                if (err){
                    cb(err);
                } else {
                    cb(null, true);
                }
            })
        }
    })
};

exports.startServer = function (serverName, cb){
    Server.getServerByName(serverName, function (err, server){

    })
}