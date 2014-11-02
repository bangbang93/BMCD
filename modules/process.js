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
    this.args = ['-jar', path.join(serverPath, jarFile), '--nojline'];
};

util.inherits(BMCDLauncher, events.EventEmitter);

BMCDLauncher.prototype.start = function (){
    var that = this;
    Config.get('java', function (err, value){
        if (err){
            throw err;
        } else {
            that.java = value;
            if (!that.java){
                throw {
                    errCode: 1,
                    errMessage: 'No Java Configure'
                };
            }
            that.server = spawn(that.java, that.args,{
                cwd: that.path
            });
            that.stdin = that.server.stdin;
            that.stdout = that.server.stdout;
            that.stderr = that.server.stderr;
            that.stdout.on('data', function (data){
                that.emit('stdout', data);
                that.output(data.toString());
            });
            that.stderr.on('data', function (data){
                that.emit('stderr', data.toString());
                that.output(data.toString());
            });
            that.server.on('exit', function (code, signal){
                console.log(that.name + ' exit:' + code + ' ' + signal);
                delete global.servers[that.name];
            });
            that.server.on('error', function (err){
                console.log(JSON.parse(err));
            });

            that.pid = that.server.pid;
        }
    });
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
    str = isBuffer(str)?str.toString():str;
    if (this.console.length > 200){
        this.console.shift();
    }
    this.console.push(str);
};

module.exports = BMCDLauncher;