/**
 * Created by bangbang93 on 14-10-7.
 */
var Config = require('../model').Config;

exports.get = function (key, cb){
    Config.findOne({
        where: {
            key: key
        }
    }, function (err, row){
        if (err){
            return cb(err);
        } else {
            if (row){
                cb(null, row);
            } else {
                cb(null, {});
            }
        }
    })
};

exports.set = function (key, value, cb){
    Config.updateOrCreate({
        where: {
            key: key
        },
        update:{
            value: value
        }
    }, function (err){
        if (err) {
            cb(err)
        } else {
            cb(null);
        }
    })
};

exports.get(233);