/**
 * Created by bangbang93 on 14-10-24.
 */
const mongoose = require('mongoose');
const Config = require('./config/database');

mongoose.Promise = require('bluebird');

mongoose.connect(`mongodb://${Config.mongodb.host}/${Config.mongodb.database}`);

exports.mongoose = mongoose;