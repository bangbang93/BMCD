/**
 * Created by bangbang93 on 2017/3/12.
 */
'use strict';
const SessionHelper = require('../helper/session');

module.exports = function (namespace) {
  namespace.use(SessionHelper.checkLoginForSocket);
  namespace.on('connection', function (socket){
    socket.on('getServerConsole', function (data) {
      socket.join(data.server);
    });
  });
};