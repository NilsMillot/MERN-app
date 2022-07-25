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

module.exports = Friend;
