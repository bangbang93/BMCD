/**
 * Created by bangbang93 on 14-10-7.
 */
var Config = require('../model').ConfigModel;

exports.get = function (key, cb){
    Config.findOne({
      key: key
    }, cb);
};

exports.getAll = function (cb){
    Config.find({}, cb);
};

exports.set = function (key, value, cb){
    Config.findOneAndUpdate({
      key: key
    }, {
      value: value
    }, function (doc, err){
      if (!doc){
        doc = new Config;
        doc.key = key;
        doc.value = value;
        doc.save(cb);
      } else {
        cb();
      }
    })
};

