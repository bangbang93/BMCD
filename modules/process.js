/**
 * Created by bangbang93 on 14-10-31.
 */
var spawn = require('child_process').spawn;
var Config = require('./config');
var events = require('events');
var util = require('util');
var async = require('async');
var path = require('path');

/**
 *
 * @param name
 * @param serverPath
 * @param jarFile
 * @param options
 * @constructor
 */
var BMCDLauncher = function(name, serverPath, jarFile, options){
    this.name = name;
    this.path = serverPath;
    this.options = options || {};
    this.java = this.options.java;
    this.args = ['-jar', path.join(serverPath, jarFile), '--nojline'];
    this.args = this.args.concat(options.opts);
};

util.inherits(BMCDLauncher, events.EventEmitter);

BMCDLauncher.prototype.start = function (cb){
    var that = this;
    that.server = spawn(that.java, that.args,{
        cwd: that.path
    });
    that.stdin = that.server.stdin;
    that.stdout = that.server.stdout;
    that.stderr = that.server.stderr;
    that.stdout.on('data', function (data){
        that.emit('stdout', data);
        that.emit('output', data);
        that.output(data.toString());
    });
    that.stderr.on('data', function (data){
        that.emit('stderr', data);
        that.emit('output', data);
        that.output(data.toString());
    });
    that.server.on('exit', function (code, signal){
        console.log(that.name + ' exit:' + code + ' ' + signal);
        that.emit('exit', code, signal);
    });
    that.server.on('error', function (err){
        console.log(JSON.parse(err));
    });

    that.pid = that.server.pid;
};

BMCDLauncher.prototype.stop = function (){
    var that = this;
    that.stdin.write('stop\n');
};

BMCDLauncher.prototype.kill = function (signal){
    var that = this;
    that.server.kill(signal || 'SIGKILL');
};

BMCDLauncher.prototype.console = [];
BMCDLauncher.prototype.output = function (str){
    str = Buffer.isBuffer(str)?str.toString():str;
    if (this.console.length > 200){
        this.console.pop();
    }
    this.console.push(str);
};

BMCDLauncher.prototype.input = function (command){
    this.output(command + '\n');
    this.stdin.write(command + '\n');
};

module.exports = BMCDLauncher;