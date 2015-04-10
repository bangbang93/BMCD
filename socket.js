/**
 * Created by bangbang93 on 14-11-2.
 */
var socketIO = require('socket.io');
var session = require('cookie-session')(global.settings.session);
var io;

var server = require('./modules/server');

module.exports = function (app){
    io = socketIO(app);
    global.io = io;

    io.use(function (socket, next){
        socket.session = parseSession(socket.request);
        next();
    });

    io.use(checkLogin);

    var serverNSP = io.of('/server');
    serverNSP.on('connection', function (socket){
        server.io(socket, serverNSP);
    })
};

var parseSession = function (req){
    session(req, {}, function (){});
    return req.session;
};

var checkLogin = function (socket, next){
    if (!!socket.session['username']){
        socket.isLogin = true;
        next();
    } else {
        socket.disconnect();
    }
};