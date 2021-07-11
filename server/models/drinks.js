"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class drinks extends Model {

    static associate(models) {
      this.belongsTo(models.Stands, {
        foreignKey: {
          name: "restaurant_name",
          allowNull: true,
        },
        sourceKey: "user_name",
      });
    }
  }
  drinks.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      restaurant_name: DataTypes.STRING,
      alcoholic: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Drinks",
      tableName: "drinks",
      underscored: true,
    },
  );
  return drinks;
};
