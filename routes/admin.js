/**
 * Created by bangbang93 on 14-10-24.
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');

var Server = require('../modules/server');
var Config = require('../modules/config');

router.use(function (req, res, next){
    if (!req.isLogin || !req.session['isAdmin']){
        res.send(403);
    } else {
        next();
    }
});

router.post('/server/create', function (req, res){
    var serverName = req.param('serverName');
    var host = req.param('host');
    var port = req.param('port');
    var path = req.param('path');
    if (!serverName || !host || !port || !path){
        return res.send(400);
    }
    Server.createServer(serverName, host, port, path, function (err, success){
        if (err){
            res.json(500, err);
        } else {
            res.send(204);
        }
    })
});

router.post('/configure', function (req, res){
    var java = req.param('java');

});

router.get('/configure', function (req, res){
    var data = {
        java: Config.get('java')
    };
    res.json(data);
});

router.get('/status', function (req, res){
    res.json({
        uptime: process.uptime(),
        uid: process.getuid(),
        gid: process.getgid(),
        arch: process.arch,
        platform: process.platform,
        memoryUsage: process.memoryUsage()
    })
});

module.exports = router;