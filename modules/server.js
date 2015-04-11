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

var setJava = function () {
  Config.get('java', function (java) {
    if (!!java) {
      manager = manager(java);
    }
  });
};

setJava();

exports.listServer = function (uid, cb) {
  Server.getServersByUser(uid, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  })
};

exports.listAllServer = function (cb) {
  Server.getAllServer(cb);
};

exports.getServerStatus = function (sid, cb) {
  Server.getServerById(sid, function (err, server) {
    if (err) {
      return cb(err);
    } else {
      var serverInfo = server.toObject();
      var isReturn = false;
      mcProtocol.ping({
        host: server['host'],
        port: server['port']
      }, function (err, result) {
        if (err) {
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
        if (!isReturn) {
          cb(null, serverInfo);
          isReturn = true;
        }
      });
      setTimeout(function () {
        if (!isReturn) {
          serverInfo.path = server.path;
          serverInfo.maxPlayers = 0;
          serverInfo.playerCount = 0;
          serverInfo.version = '0.0';
          serverInfo.status = 'timed';
          cb(null, serverInfo);
          isReturn = true;
        }
      }, 5000);
    }
  })
};

exports.getServerInfo = function (sid, cb) {
  Server.getServerById(sid, function (err, server) {
    if (err) {
      return cb(err);
    } else {
      cb(null, manager.getServer(sid));
    }
  })
};

exports.createServer = function (name, host, port, path, file, args, cb) {
  fs.readdir(path, function (err) {
    if (err) {
      cb(err)
    } else {
      Server.addServer({
        name: name,
        host: host,
        port: port,
        path: path,
        file: file,
        args: args
      }, function (err) {
        if (err) {
          cb(err);
        } else {
          cb(null, true);
        }
      })
    }
  })
};

exports.startServer = function (sid, cb) {
  manager.start(sid, cb);
};

exports.stopServer = function (serverName, cb) {
  if (!!manager) {
    cb(null, manager.stopServer(serverName));
  }
};

exports.killServer = function (serverName, cb) {
  if (!!manager) {
    cb(null, manager.killServer(serverName));
  }
};

exports.io = function (socket, nsp) {
  debug(socket.id + ' connect to /server');
  socket.on('init', function (data) {
    debug(socket.id + ' in ' + data.server + ' console');
    socket.join(data.server);
  });
};
