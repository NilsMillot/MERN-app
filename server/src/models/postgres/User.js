const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");
const { hash, genSalt } = require("bcrypt");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          min: 6,
          max: 255,
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          min: 2,
        },
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.addHook("beforeCreate", async (user) => {
  user.password = await hash(user.password, await genSalt());
});
User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await hash(user.password, await genSalt());
  }
});

module.exports = User;
