/**
 * Created by bangbang93 on 2017/3/10.
 */
'use strict';
const session = require('cookie-session')(require('../config/session'));

exports.checkLogin = function (req, res, next) {
  if (!req.session || !req.session.uid){
    return res.status(401).json({
      msg: 'need login'
    });
  } else {
    next();
  }
};

exports.checkLoginForSocket = function (socket, next) {
  let req = socket.request;
  session(req, socket, function () {
    if (!req.session || !req.session.uid){
      next(new Error('need login'));
    } else {
      socket.session = req.session;
      next();
    }
  })
};

exports.isAdmin = function (req, res, next) {
  if (!req.session.isAdmin){
    return res.status(403).json({
      msg: 'need admin',
    })
  } else {
    next();
  }
};