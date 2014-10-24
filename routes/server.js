/**
 * Created by bangbang93 on 14-8-20.
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('BMCD');
var server = require('../modules/server');

router.use(function (req, res, next){
    if (req.isLogin){
        next();
    } else {
        res.send(403);
    }
});

router.get('/list', function (req, res){
    server.listServer(function (err, list){
        if (err){
            res.json(500, err);
        } else {
            res.json(list);
        }
    })
});

router.get('/info/:serverName', function (req, res){

});


module.exports = router;