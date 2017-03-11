/**
 * Created by bangbang93 on 14-11-2.
 */
const Server      = require('socket.io');
const SessionHelper = require('./helper/session');

const io = new Server({
  path: '/socket.io',
  serveClient: false,
});

require('./socket/server')(io.of('/server'));
require('./socket/dashboard')(io.of('/dashboard'));


module.exports = io;