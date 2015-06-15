/**
 * Created by bangbang93 on 14-11-3.
 */
var Process = require('./process');
var Server = require('../models/server');
var async = require('async');
var Q = require('q');

var serverPool = {};

exports.start = function (sid, cb){
  async.waterfall([
    function (cb) {
      var server = serverPool[sid];
      if (!server){
        Server.getServerById(sid, function (err, server) {
          if (err){
            cb(err);
          } else {
            serverPool[sid] = server.toObject();
            if (!server.java){
              cb(new Error('no java'));
            }
            serverPool[sid].process = new Process(server.name, server.path, server.file, {
              args: server.args,
              java: server.java
            });
            cb(null ,serverPool[sid]);
          }
        })
      } else {
        cb(null, server);
      }
    },
    function (server, cb) {
      if(!server){
        cb(new Error('server does not exists'));
      } else{
        server.startTime = new Date;
        server.status = 'on';
        server.process.start(new Function);
        server.process.on('output', function (output){
          global.io.to(server._id).emit('output', output);
        });
        server.process.on('exit', exitHandle(server._id));
        cb(null, server);
      }
    }
  ], cb);
};

exports.stop = function (sid, cb){
  var server = serverPool[sid];
  if (!server){
    return cb('server does not exists');
  } else {
    server.process.stop();
    server.removeAllListeners('output');
    cb(null, server);
  }
};

exports.kill = function (sid, cb){
  var server = serverPool[sid];
  if (!server){
    return cb('server does not exists');
  } else {
    server.process.kill();
    server.removeAllListeners('output');
    cb(null, server);
  }
};

exports.getServer = function (sid, cb){
  if (cb){
    return cb(serverPool[sid]);
  } else {
    return serverPool[sid];
  }
};

function exitHandle(sid){
  return function (){
    var server = serverPool[sid];
    if (server){
      server.startTime = 0;
      server.status = 'off';
    }
  }
}