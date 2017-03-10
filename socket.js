/**
 * Created by bangbang93 on 14-11-2.
 */
const Server      = require('socket.io');
const SessionHelper = require('./helper/session');

const io = new Server({
  path: '/ws',
  serveClient: false,
});

const serverNSP = io.of('/server');
serverNSP.on('connection', function (socket){
  socket.on('getServerConsole', function (data) {
    socket.join(data.server);
  });
});

module.exports = io;