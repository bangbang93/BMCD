/**
 * Created by bangbang93 on 14-8-20.
 */
const fs         = require('mz/fs');
const path       = require('path');
const mcProtocol = require('../helper/minecraft-protocol');
let manager    = require('./manager');

const ServerModel = require('../model/server');
const UserModel = require('../model/user');
const ConfigModel = require('../model/config');

exports.listByUser = async function (uid) {
  let user = await UserModel.getById(uid);
  let serverIds = user.servers;
  return ServerModel.listByIds(serverIds);
};

exports.listAllServer = function () {
  return ServerModel.listAll();
};

exports.getServerStatus = async function (sid) {
  let server = await ServerModel.getServerById(sid);
  server = server.toJSON();
  return mcProtocol.ping(server);
};

exports.getServerInfo = function (sid) {
  return ServerModel.getServerById(sid);
};

exports.createServer = async function (server) {
  if (!await fs.exists(path)){
    throw new Error('path not exists');
  }
  return ServerModel.addServer(server);
};

exports.startServer = function (sid) {
  return manager.start(sid);
};

exports.editServer = async function (sid, data) {
  let server = await ServerModel.getServerById(sid);
  return server.update(data);
};

exports.stopServer = function (sid) {
  return manager.stop(sid);
};

exports.killServer = function (sid) {
  return manager.kill(sid)
};
