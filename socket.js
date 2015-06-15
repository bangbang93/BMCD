/**
 * Created by bangbang93 on 14-11-2.
 */
var Config = require('./config');
var io = require('socket.io');
var session = require('cookie-session')(Config.session);
var debug = require('debug')('BMCD:socket');

module.exports = function (app){
  io = io(app);

  io.use(function (socket, next){
      socket.session = parseSession(socket.request);
      next();
  });

  io.use(checkLogin);

  var serverNSP = io.of('/server');
  serverNSP.on('connection', function (socket){
      debug(socket.id + ' connect to /server');
      socket.on('getServerConsole', function (data) {
          debug(socket.id + ' in ' + data.server + ' console');
          socket.join(data.server);
      });
  });
  return io;
};

var parseSession = function (req){
    session(req, {}, function (){});
    return req.session;
};

var checkLogin = function (socket, next){
    if (!!socket.session['username']){
        socket.isLogin = true;
        next();
    } else {
        socket.disconnect();
    }
};