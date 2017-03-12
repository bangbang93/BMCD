/**
 * Created by bangbang93 on 2017/3/12.
 */
'use strict';
const router = require('express-promise-router')();
const SessionHelper = require('../../helper/session');
const ConfigService = require('../../service/config');

router.use(SessionHelper.checkLogin);

router.get('/:key', async function (req, res) {
  let key = req.params.key;
  let config = await ConfigService.get(key);
  if (!config){
    return res.status(404).json({
      msg: 'no such config key'
    });
  }
  if (config.isPublic) {
    res.json(config.value);
  } else {
    res.status(403).json({
      msg: 'not public config'
    });
  }
});


module.exports = router;