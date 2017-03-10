/**
 * Created by bangbang93 on 2017/3/10.
 */
'use strict';
const mcProtocol = require('minecraft-protocol');

exports.ping = function (data) {
  return Promise.race([
    ping(data),
    new Promise((resolve, reject)=>{
      setTimeout(()=>reject(new Error('timeout')), 5e3);
    })
  ])
};

function ping (data){
  return new Promise((resolve, reject)=>{
    mcProtocol.ping(data, (err, response)=>{
      if (err) return reject(err);
      resolve(response);
    })
  })
}