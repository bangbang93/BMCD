/**
 * Created by bangbang93 on 14-10-7.
 */
var Server = require('../model').ServerModel;
var User = require('../model').UserModel;

exports.getServerByName = function (serverName, cb){
    Server.findOne({
        name: serverName
    }, cb);
};

exports.getServersByUser = function (uid, cb){
    User.findById(uid, 'servers', function (err, doc){
      doc = doc || {};
      cb(err, doc.servers);
    })
};

exports.getServerById = function (sid, cb){
  Server.findById(sid, cb);
};

exports.getAllServer = function (cb){
  Server.find({}, cb);
};

exports.addServer = function (data, cb){
    var server = new Server({
      name: data.name,
      host: data.host,
      port: data.port,
      path: data.path,
      file: data.file
    });
  server.save(cb);
};