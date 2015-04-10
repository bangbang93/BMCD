/**
 * Created by bangbang93 on 14-11-3.
 */
var daemon;

module.exports = function (java, io){
    io = io || global.io;
    daemon = new (require('minecraft-daemon'))(java);
    this.stopServer = function (serverName){
        return daemon.stopServer(serverName);
    };
    this.startServer = function (serverName){
        return daemon.startServer(serverName);
    };
    this.killServer = function (serverName){
        return daemon.killServer(serverName);
    };
    this.addServer = function (serverName, serverPath, jarFile, opt){
        return daemon.addServer(serverName, serverPath, jarFile, opt);
    };
    this.getServer = function (serverName){
        return daemon.getServer(serverName);
    };
    this.deleteServer = function (serverName){
        return daemon.deleteServer(serverName);
    };
    daemon.on('output', function (data){
        io.to(data.serverName).emit('output', data.data);
    })
};