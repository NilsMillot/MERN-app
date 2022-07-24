const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");
exports.User = require("./User");

class Invitation extends Model {}

Invitation.init(
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "invitation",
  }
);

exports.User.hasMany(Invitation, {
  foreignKey: 'senderId',
  as: 'sendedInvitations'
});
Invitation.belongsTo(exports.User, {
  foreignKey: 'senderId',
  as: 'sender'
});

exports.User.hasMany(Invitation, {
  foreignKey: 'receiverId',
  as: 'receivedInvitations'
});
Invitation.belongsTo(exports.User, {
  foreignKey: 'receiverId',
  as: 'receiver'
});

module.exports = Invitation;
