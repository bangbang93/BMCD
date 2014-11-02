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

global.servers = {};

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
            serverInfo.path = server['path'];
            serverInfo.file = server['file'];
            var isReturn = false;
            mcProtocol.ping({
                host: server['host'],
                port: server['port']
            }, function (err, result){
                if (err){
                    serverInfo.maxPlayers = 0;
                    serverInfo.playerCount = 0;
                    serverInfo.version = '0.0';
                    serverInfo.status = 'failed'
                } else {
                    serverInfo.maxPlayers = result.players.max;
                    serverInfo.playerCount = result.players.online;
                    serverInfo.version = result.version;
                    serverInfo.status = 'success'
                }
                cb(null, serverInfo);
                isReturn = true;
            });
            setTimeout(function (){
                if (!isReturn){
                    serverInfo.path = server.path;
                    serverInfo.maxPlayers = 0;
                    serverInfo.playerCount = 0;
                    serverInfo.version = '0.0';
                    serverInfo.status = 'timed';
                    cb(null, serverInfo);
                }
            }, 5000);
        }
    })
};

exports.createServer = function (serverName, host, port, path, file, cb){
    fs.readdir(path, function (err){
        if (err){
            cb(err)
        } else {
            Server.addServer({
                serverName: serverName,
                host: host,
                port: port,
                path: path,
                file: file
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
        if (err){
            return cb(err);
        } else {
            if (!!global.servers[serverName]){
                return cb({
                    errCode: 2,
                    errMsg: 'Server Already Running'
                });
            } else {
                try{
                    var process = new Process(server.serverName, server.path, server.file);
                    global.servers[server.serverName] = process;
                    console.log(process);
                    process.start();
                    return cb(null, process.pid);
                } catch (err) {
                    if (err.errCode == 1){
                        return cb(err);
                    }
                }
            }
        }
    })
};

exports.stopServer = function (serverName, cb){
    if (!!global.servers[serverName]){
        var server = global.servers[serverName];
        server.stop();
        cb();
    } else {
        cb({
            errCode: 3,
            errMsg: 'Server not Exist'
        });
    }
};

exports.killServer = function (serverName, cb){
    if (!!global.servers[serverName]){
        var server = global.servers[serverName];
        server.kill();
        cb();
    } else {
        cb({
            errCode: 3,
            errMsg: 'Server not Exist'
        });
    }
};

exports.io = function(socket, nsp){
    debug(socket.id + 'connect to /server');
    socket.on('init', function (data){
        socket.join(data['server']);
    });
};