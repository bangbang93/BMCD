/**
 * Created by bangbang93 on 14-11-2.
 */
const Server      = require('socket.io');
const SessionHelper = require('./helper/session');
const session = require('cookie-session')(require('./config/session'));

const io = new Server({
  path: '/socket.io',
  serveClient: false,
});

const serverNSP = io.of('/server');
serverNSP.use(function (socket, next) {
  let req = socket.request;
  session(req, null, function () {
    if (!SessionHelper.checkLoginNoRes(req)){
      next(new Error('need login'));
    } else {
      next();
    }
  })
});

serverNSP.on('connection', function (socket){
  socket.on('getServerConsole', function (data) {
    socket.join(data.server);
  });
});

module.exports = io;