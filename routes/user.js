var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');

var User = require('../modules/user');

router.get('/status', function(req, res) {
    if (req.isLogin){
        res.json({
            success: true,
            code: 0,
            message: '已登录',
            username: req.session['username'],
            isAdmin: req.session['isAdmin']
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

    if (!username || !password){
        return res.send(400);
    }

    User.login(username, password, function (err, result){
        if (err){
            res.json(500, err);
        } else {
            if (result){
                req.session['username'] = username;
                req.session['uid'] = result['uid'];
                req.session['isAdmin'] = result['isAdmin'];
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
        }
    })
});
router.get('/logout', function (req, res){
    req.session = null;
    res.json({
        success: true,
        code: 0,
        message:'退出成功'
    })
});

module.exports = router;
