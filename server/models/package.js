"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Package.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "package name cannot be null",
          },
          notEmpty: {
            msg: "package name cannot be empty string",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "package description cannot be null",
          },
          notEmpty: {
            msg: "package description cannot be empty string",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "price is null",
          },
          min: {
            args: [1],
            msg: "price cannot be equal or below zero",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
