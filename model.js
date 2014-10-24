/**
 * Created by bangbang93 on 14-10-24.
 */
var Schema = require('jugglingdb').Schema;
var BMCDSchema = new Schema('sqlite3', {
    database: 'config'
});

exports.Config = BMCDSchema.define('config', {
    key: String,
    value: String
});