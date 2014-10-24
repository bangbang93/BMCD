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
        Server.listServer(null, function (err, list){
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

router.get('/info/:serverName', function (req, res){
    var serverName = req.param('serverName');
    if (!serverName){
        return res.send(400);
    }
    Server.getServerInfo(serverName, function (err, result){
        if (err){
            res.json(500, err);
        } else {
            res.json(result);
        }
    })
});



module.exports = router;