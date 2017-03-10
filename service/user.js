/**
 * Created by bangbang93 on 14-10-24.
 */
const UserModel = require('../model/user');
const HashHelper = require('../helper/hash');

exports.login = async function (username, password) {
  let user = await UserModel.getUserByName(username);
  if (!user) {
    throw new Error('no such user');
  }
  if (await HashHelper.compare(password, user.password)) {
    let user = user.toJSON();
    delete user.password;
    return user;
  } else {
    throw new Error('wrong password');
  }
};

exports.listUser = async function () {
  let users = await UserModel.listUser();
  return users.map((user)=>{
    user = user.toJSON();
    delete user.password;
  });
};

exports.changePassword = async function (uid, oldPassword, newPassword) {
  let user = await UserModel.getById(uid);
  if (!await HashHelper.compare(oldPassword, user.password)){
    throw new Error('wrong password');
  }
  user.password = await HashHelper.hashPassword(newPassword);
  return user.save();
};

exports.addUser = async function (username, password) {
  return UserModel.addUser(username, await HashHelper.hashPassword(password));
};