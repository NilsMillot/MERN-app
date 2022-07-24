const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");
exports.User = require("./User");

class Friend extends Model {}

Friend.init(
  {},
  {
    sequelize,
    modelName: "friend",
  }
);

exports.User.hasMany(Friend,{as: "user", foreignKey: "userId"});
Friend.belongsTo(exports.User, {as: "user", foreignKey: "userId"});

exports.User.hasMany(Friend,{as: "userFriend", foreignKey: "friendId"});
Friend.belongsTo(exports.User, {as: "userFriend", foreignKey: "friendId"});

module.exports = Friend;
