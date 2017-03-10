/**
 * Created by bangbang93 on 14-10-24.
 */
const router = require('express-promise-router');
const Server = require('../../service/server');
const Config = require('../../service/config');
const User   = require('../../service/user');
const SessionHelper = require('../../helper/session');

router.use(SessionHelper.checkLogin, SessionHelper.isAdmin);

router.post('/server/create', async function (req, res) {
  let name   = req.body['name'];
  let host   = req.body['host'];
  let port   = req.body['port'];
  let path   = req.body['path'];
  let file   = req.body['file'];
  const java = req.body['java'];
  const args = req.body['args'] || [];
  if (!name || !host || !port || !path || !file) {
    return res.status(400).json({
      msg: 'missing params'
    });
  }
  await Server.createServer(req.body);
  res.status(201).json({
    msg: 'create success',
  });
});

const editField = ['name', 'host', 'port', 'path', 'file', 'args', 'java'];
router.post('/server/edit', function (req, res, next) {
  let sid = req.body['sid'] || req.body['_id'];
  if (!sid) {
    return res.send(400);
  }
  const data = {};
  editField.forEach(function (e) {
    data[e] = req.body[e];
  });
  Server.editServer(sid, data, function (err) {
    if (err){
      next(err);
    } else {
      res.status(200).end();
    }
  })
});

router.post('/configure', function (req, res) {
  const java = req.param('java');
  Config.set('java', java);
  res.send(204);
});

router.get('/configure', function (req, res) {
  Config.getAll(function (err, config) {
    res.json(config);
  })
});

router.get('/configure/:name', function (req, res) {
  const name = req.param('name');
  Config.get(name, function (err, config){
    if (err){
      res.status(500).json(err);
    } else {
      res.json(config);
    }
  })
});

router.get('/status', function (req, res) {
  res.json({
    uptime: process.uptime(),
    uid: (process.getuid && process.getuid()) || 0,
    gid: (process.getgid && process.getgid()) || 0,
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
  const username = req.param('username');
  const password = req.param('password');

  User.changePassword(username, password, function (err) {
    if (err) {
      res.json(500, err);
    } else {
      res.send(204);
    }
  })
});

module.exports = router;