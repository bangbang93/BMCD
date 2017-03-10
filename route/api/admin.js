/**
 * Created by bangbang93 on 14-10-24.
 */
const router = require('express-promise-router')();
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

router.put('/server/:sid', async function (req, res, next) {
  let sid = req.params['sid'];

  await Server.editServer(sid, data);

  res.json({
    msg: 'success'
  });
});

router.put('/configure/:key', function (req, res) {
  res.sendStatus(204);
});

router.get('/configure', async function (req, res) {
  let configs = await Config.getAll();
  res.json(configs);
});

router.get('/configure/:key', async function (req, res) {
  const key = req.params['key'];

  let config = await Config.get(key);
  res.json(config);
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

router.get('/userList', async function (req, res) {
  let users = await User.listUser();
  res.json(users);
});

router.post('/changePassword', async function (req, res, next) {
  const uid = req.session.uid;
  const {oldPassword, newPassword} = req.body;

  try {
    await User.changePassword(uid, oldPassword, newPassword);
    res.json({
      msg: 'success'
    });
  }
  catch(e){
    switch (e.message){
      case 'wrong password':
        res.status(403).json({
          msg: e.message
        });
        break;
      default:
        next(e);
    }
  }
});

module.exports = router;