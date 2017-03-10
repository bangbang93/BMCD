const router = require('express-promise-router');

const UserService   = require('../../service/user');
const SessionHelper = require('../../helper/session');

router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      msg: 'missing params'
    });
  }

  try {
    let user             = await UserService.login(username, password);
    req.session.uid      = user._id;
    req.session.username = user.username;
    res.json({
      uid     : user._id,
      username: user.username
    });
  }
  catch (e) {
    switch (e.message) {
      case 'wrong password':
      case 'no such user':
        res.status(401).json({
          msg: 'wrong password'
        });
        break;
      default:
        next(e);
    }
  }
});

router.use(SessionHelper.checkLogin);

router.get('/login', function (req, res) {
  res.json({
    uid: req.session.uid,
    username: req.session.username
  });
});


router.get('/logout', function (req, res) {
  req.session.destroy();
  res.json({
    msg: 'success'
  });
});

module.exports = router;
