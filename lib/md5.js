/**
 * Created by ΰ�� on 2015/6/15.
 */
var crypto = require('crypto');

module.exports = function (str) {
  return crypto.createHash('md5').update(str).digest('hex')
};