var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');

router.get('/status', function(req, res) {
    if (!!req.session['username']){
        res.json({
            success: true,
            code: 0,
            message: '已登录',
            username: req.session['username']
        })
    } else {
        res.json({
            success: false,
            code: 1,
            message: '请先登录'
        });
    }
});

router.post('/login', function (req, res){
    var username = req.param('username');
    var password = req.param('password');
    if (global.settings.users[username] == password){
        req.session['username'] = username;
        res.json({
            success: true,
            code: 0,
            message: '登录成功'
        });
    } else {
        res.json({
            success: false,
            code: 1,
            message: '用户名或密码错误'
        })
    }
});
router.get('/logout', function (req, res){
    req.session.destroy();
    res.json({
        success: true,
        code: 0,
        message:'退出成功'
    })
});

module.exports = router;
