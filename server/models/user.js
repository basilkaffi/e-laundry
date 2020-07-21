"use strict";
const { Model } = require("sequelize");
const { hashPwd } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username cannot be null",
          },
          notEmpty: {
            msg: "username cannot be empty string",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            msg:
              "password minimal 8 characters, contain one letter and one number",
          },
        },
      },
      role: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    instance.password = hashPwd(instance.password);
  });
  return User;
};
