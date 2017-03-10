/**
 * Created by bangbang93 on 14-10-7.
 */
const mongoose = require('../model');

const Schema = new mongoose.Schema({
  key  : String,
  value: Mixed
});

const Model = mongoose.model('config', Schema);

exports.get = function (key){
    return Model.findOne({
      key: key
    }).exec();
};

exports.getAll = function (){
    return Model.find({}).exec();
};

exports.set = function (key, value){
    return Model.update({
      key
    }, {
      key,
      value
    }, {
      upsert: true,
    }).exec();
};