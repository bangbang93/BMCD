/**
 * Created by bangbang93 on 14-8-20.
 */
var debug = require('debug')('BMCD');
var fs = require('fs');
var async = require('async');
var path = require('path');
var mcProtocol = require('minecraft-protocol');
var manager = require('./manager');

var Server = require('../models/server');
var Config = require('../models/config');
var Process = require('./process');

var setJava = function (){
    Config.get('java', function (java){
        if (!!java){
            manager = manager(java);
        }
    });
};

setJava();

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
    debug(manager);
    if (!!manager){
        if (manager.getServer(serverName)){
            cb(null, manager.startServer(serverName));
        } else {
            Server.getServerByName(serverName, function (err, server){
                if (err){
                    return cb(err);
                } else {
                    console.log(server);
                    server.opt = JSON.parse(server.opt);
                    manager.addServer(server.name, server.path, server,file, server.opt);
                    cb(null, manager.startServer(server.name));
                }
            })
        }
    }
};

exports.stopServer = function (serverName, cb){
    if (!!manager){
        cb(null, manager.stopServer(serverName));
    }
};

exports.killServer = function (serverName, cb){
    if (!!manager){
        cb(null, manager.killServer(serverName));
    }
};

exports.io = function(socket, nsp){
    debug(socket.id + ' connect to /server');
    socket.on('init', function (data){
        debug(socket.id + ' in ' + data.server + ' console');
        socket.join(data.server);
    });
};
