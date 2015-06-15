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
    }, function (err, doc){
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

Config.count({}, function (err, count) {
  if (count == 0){
    var config = new Config;
    config.key = 'java';
    config.value = [];
    config.save(initError);
  }
});

function initError(err){
  if (err){
    console.error('初始化设置失败');
    throw err;
  } else {
    console.log('初始化设置成功');
  }
}