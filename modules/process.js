/**
 * Created by bangbang93 on 14-10-31.
 */
var spawn = require('child_process').spawn;
var config = require('./config');
var events = require('events');
var util = require('util');

/**
 *
 * @param name
 * @param path
 * @param jarFile
 * @param options
 * @constructor
 */
var BMCDLauncher = function(name, path, jarFile, options){
    this.name = name;
    this.path = path;
    this.options = options || {};
    this.args = ['-jar', jarFile];
    this.java = config.get('java');

    if (!this.java){
        throw {
            errCode: 1,
            errMessage: 'No Java Configure'
        };
    }
};

util.inherits(BMCDLauncher, events.EventEmitter);

BMCDLauncher.prototype.start = function (){
    var that = this;

    that.stdin = server.stdin;
    that.stdout = server.stdout;
    that.stderr = server.stderr;

    that.server = spawn(this.java, this.args);
    that.stdout.on('data', function (data){
        this.emit('stdout', data);
    });
    that.stderr.on('data', function (data){
        this.emit('stderr', data);
    });
    that.server.on('exit', function (code, signal){
        console.log(that.name + ' exit:' + code + ' ' + signal);
    });
    that.server.on('error', function (err){
        console.log(JSON.parse(err));
    });

    that.pid = server.pid;
};

BMCDLauncher.prototype.stop = function (){
    var that = this;
    that.stdin.write('/stop\n');
};

BMCDLauncher.prototype.kill = function (signal){
    var that = this;
    that.server.kill(signal || 'SIGKILL');
};

module.exports = BMCDLauncher;