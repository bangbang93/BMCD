/**
 * Created by bangbang93 on 14-10-24.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('bmcd', null, null, {
    dialect: 'sqlite',
    storage: 'bmcd.db'
});

sequelize.authenticate();

exports.Config = sequelize.define('config', {
    key: Sequelize.STRING,
    value: Sequelize.TEXT
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
    path: Sequelize.STRING,
    file: Sequelize.STRING
});

sequelize.sync({
    logging: console.log
//    force: true
}).success(function (){
    exports.User.findAll().success(function (rows){
        if (rows.length === 0){
            exports.User.create({
                username: 'admin',
                password: '21232f297a57a5a743894a0e4a801fc3',
                isAdmin: true
            })
        }
    })
});

exports.User.hasMany(exports.Server);
exports.Server.hasMany(exports.User);