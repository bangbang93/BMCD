/**
 * Created by bangbang93 on 14-10-7.
 */
const mongoose = require('../model').mongoose;

const Schema = new mongoose.Schema({
  username: String,
  password: String,
  servers : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'server'
  }],
  isAdmin : {
    type   : Boolean,
    default: false
  }
});

const Model = mongoose.model('user', Schema);

exports.getUserByName = function (username){
  return Model.findOne({
    username: username
  }).exec();
};

exports.getById = function (id) {
  return Model.findById(id).exec();
}

exports.addUser = function (username, password){
  return Model.create({
    username,
    password,
    isAdmin: false,
  })
};

exports.listUser = function (){
  return Model.find({}).exec();
};