/**
 * Created by bangbang93 on 14-11-3.
 */
var Process = require('./process');
var Server = require('./server');
var io = global.io;

var serverPool = {};

Server.listAllServer(function (err, servers){
  if (err){
    throw err;
  } else {
    servers.forEach(function (e){
      var server = serverPool[e._id] = e.toObject();
      server.status = 'off';
      server.startTime = 0;
      server.process = new Process(server.name, server.path, server.file, server.opt);
    })
  }
});

exports.start = function (sid, cb){
  var server = serverPool[sid];
  if (!server){
    return cb('server does not exists');
  } else {
    server.startTime = new Date;
    server.process.start();
    server.on('output', function (output){
      io.to(server._id).emit('output', output);
    });
    cb(null, server);
  }
};

exports.stop = function (sid, cb){
  var server = serverPool[sid];
  if (!server){
    return cb('server does not exists');
  } else {
    server.startTime = 0;
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
    server.startTime = 0;
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