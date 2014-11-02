/**
 * Created by bangbang93 on 14-10-24.
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');

var Server = require('../modules/server');
var Config = require('../modules/config');

router.use(function (req, res, next){
    if (!req.isLogin || !req.isAdmin){
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
    var file = req.param('file');
    if (!serverName || !host || !port || !path || !file){
        return res.send(400);
    }
    Server.createServer(serverName, host, port, path, file, function (err, success){
        if (err){
            if (err.errno == 34){
                res.send(404);
            } else {
                res.json(500, err);
            }
        } else {
            res.send(204);
        }
    })
});

router.post('/configure', function (req, res){
    var java = req.param('java');
    Config.set('java', java);
    res.send(204);
});

router.get('/configure', function (req, res){
    Config.getAll(function (err, config){
        res.json(config);
    })
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