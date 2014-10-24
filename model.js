/**
 * Created by bangbang93 on 14-10-24.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('bmcd', null, null, {
    dialect: 'sqlite',
    storage: 'bmcd.db'
});

sequelize.authenticate();
sequelize.sync({
    logging: console.log
//    force: true
});

exports.Config = sequelize.define('config', {
    key: Sequelize.STRING,
    value: Sequelize.STRING
});

exports.User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN
});

exports.Manage = sequelize.define('manage', {
    uid: Sequelize.INTEGER,
    sid: Sequelize.INTEGER
});

exports.Server = sequelize.define('server', {
    serverName: Sequelize.STRING,
    host: Sequelize.STRING,
    port: Sequelize.INTEGER,
    path: Sequelize.STRING
});

exports.User.hasMany(exports.Server);
exports.Server.hasMany(exports.User);