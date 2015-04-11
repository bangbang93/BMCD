/**
 * Created by bangbang93 on 14-10-24.
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');

var Server = require('../modules/server');
var Config = require('../modules/config');
var User = require('../modules/user');

router.use(function (req, res, next) {
  if (!req.isLogin || !req.isAdmin) {
    res.send(403);
  } else {
    next();
  }
});

router.post('/server/create', function (req, res) {
  var name = req.param('name');
  var host = req.param('host');
  var port = req.param('port');
  var path = req.param('path');
  var file = req.param('file');
  var args = req.param('args') || [];
  if (!name || !host || !port || !path || !file) {
    return res.send(400);
  }
  Server.createServer(name, host, port, path, file, args, function (err) {
    if (err) {
      if (err.errno == 34) {
        res.send(404);
      } else {
        res.json(500, err);
      }
    } else {
      res.send(204);
    }
  })
});

router.post('/configure', function (req, res) {
  var java = req.param('java');
  Config.set('java', java);
  res.send(204);
});

router.get('/configure', function (req, res) {
  Config.getAll(function (err, config) {
    res.json(config);
  })
});

router.get('/status', function (req, res) {
  res.json({
    uptime: process.uptime(),
    uid: process.getuid(),
    gid: process.getgid(),
    arch: process.arch,
    platform: process.platform,
    memoryUsage: process.memoryUsage()
  })
});

router.get('/userList', function (req, res) {
  User.listUser(function (users) {
    res.json(users);
  })
});

router.post('/changePassword', function (req, res) {
  var username = req.param('username');
  var password = req.param('password');

  User.changePassword(username, password, function (err) {
    if (err) {
      res.json(500, err);
    } else {
      res.send(204);
    }
  })
});

module.exports = router;