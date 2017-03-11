/**
 * Created by bangbang93 on 2017/3/12.
 */
'use strict';
const SessionHelper = require('../helper/session');
const UserService = require('../service/user');

module.exports = function (namespace) {
  namespace.use(SessionHelper.checkLoginForSocket);
  setInterval(async ()=>{
    if (Object.keys(namespace.connected).length > 0){
      let stat = await UserService.getOsDashboard();
      namespace.emit('osStat', stat);
    }
  }, 1e3);
};