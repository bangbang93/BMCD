/**
 * Created by bangbang93 on 2017/3/10.
 */
'use strict';
exports.checkLogin = function (req, res, next) {
  if (!req.session || !req.session.uid){
    return res.status(401).json({
      msg: 'need login'
    });
  } else {
    next();
  }
};

exports.checkLoginNoRes = function (req) {
  return req.session && req.session.uid;
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