/**
 * Created by bangbang93 on 14-8-20.
 */
const router        = require('express-promise-router')();
const ServerService = require('../../service/server');
const SessionHelper = require('../../helper/session');

router.use(SessionHelper.checkLogin);

router.get('/list', async function (req, res) {
  let server;
  if (req.session.isAdmin) {
    server = await ServerService.listAllServer();
  } else {
    let uid = req.session.uid;
    server = await ServerService.listByUser(uid);
  }
  res.json(server);
});

router.get('/info/:sid', async function (req, res) {
  let sid = req.params['sid'];

  let info = await ServerService.getServerInfo(sid);
  res.json(info);
});

router.get('/status/:sid', async function (req, res, next) {
  let sid = req.params['sid'];

  let status = await ServerService.getServerStatus(sid);

  res.json(status);
});

router.patch('/start/:sid', async function (req, res, next) {
  let sid = req.params['sid'];

  await ServerService.startServer(sid);

  res.json({
    msg: 'success'
  });
});

router.patch('/stop/:sid', async function (req, res) {
  let sid = req.params['sid'];

  await ServerService.stopServer(sid);

  res.json({
    msg: 'success'
  });
});

router.patch('/kill/:sid', async function (req, res) {
  let sid = req.params['sid'];

  await ServerService.killServer(sid);

  res.json({
    msg: 'success'
  })
});

module.exports = router;