/**
 * Created by bangbang93 on 14-8-20.
 */
var debug = require('debug')('BMCD');
var fs = require('fs');
var async = require('async');
var path = require('path');

exports.listServer = function (callback){
    console.log("正在搜索" + global.settings.serverDirectory);
    fs.readdir(global.settings.serverDirectory, function (err, files){
        if (!!err){
            return callback(err);
        } else {
            if (files.length > 0){
                var serverDir = [];
                var q = async.queue(fs.stat, 5);
                q.drain = function () {
                    return callback(null, serverDir);
                };
                files.forEach(function (file){
                    q.push(path.join(global.settings.serverDirectory, file), function (err ,stats){
                        if (!!err){
                            q.kill();
                            return callback(err);
                        } else {
                            if (stats.isDirectory()){
                                serverDir.push(file);
                            }
                        }
                    })
                })
            } else {
                return callback(null, []);
            }
        }
    })
};