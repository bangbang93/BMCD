/**
 * Created by bangbang93 on 14-8-20.
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');
var Server = require('../modules/server');

router.use(function (req, res, next){
    if (req.isLogin){
        next();
    } else {
        res.send(403);
    }
});

router.get('/list', function (req, res){
    if (req.isAdmin){
        Server.listAllServer(function (err, list){
            if (err){
                res.json(500, err);
            } else {
                res.json(list);
            }
        })
    } else {
        Server.listServer(req.session['uid'], function (err, list){
            if (err){
                res.json(500, err);
            } else {
                res.json(list);
            }
        })
    }
});

router.get('/info/:sid', function (req, res){
    var sid = req.param('sid');
    if (!sid){
        return res.send(400);
    }
    Server.getServerInfo(sid, function (err, result){
        if (err){
            res.json(500, err);
        } else {
            res.json(result);
        }
    })
});

router.get('/start/:sid', function (req, res){
    var sid = req.param('sid');
    if (!sid){
        return res.send(400);
    }
    Server.startServer(sid, function (err, pid){
        if (err){
            if (err.errCode == 1){
                return res.json(409, err);
            } else {
                return res.json(500, err);
            }
        } else {
            res.send(200, pid);
        }
    });
});

router.get('/stop/:serverName', function (req, res){
    var serverName = req.param('serverName');
    if (!serverName){
        return res.send(400);
    }
    Server.stopServer(serverName, function (err, pid){
        if (err){
            if (err.errCode == 1){
                return res.json(409, err);
            } else {
                return res.json(500, err);
            }
        } else {
            res.send(200, pid);
        }
    });
});

router.get('/kill/:serverName', function (req, res){
    var serverName = req.param('serverName');
    if (!serverName){
        return res.send(400);
    }
    Server.killServer(serverName, function (err, pid){
        if (err){
            if (err.errCode == 1){
                return res.json(409, err);
            } else {
                return res.json(500, err);
            }
        } else {
            res.send(200, pid);
        }
    });
});

module.exports = router;