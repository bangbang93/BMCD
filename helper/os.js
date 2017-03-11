/**
 * Created by bangbang93 on 2017/3/11.
 */
'use strict';
const cpuStats = require('cpu-stats');
const cpuNums = require('os').cpus().length;

exports.cpuPercent = function () {
  return new Promise((resolve, reject)=>{
    cpuStats((err, stat)=>{
      if (err) return reject(err);
      let p = stat.reduce((p, e)=>{
        return p+e.cpu;
      }, 0);
      resolve((p / cpuNums).toFixed(2));
    })
  })
};