"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Orders, {
        sourceKey: "name",
        foreignKey: "restaurant_name",
      });
      this.hasMany(models.Dishes, {
        sourceKey: "name",
        foreignKey: "restaurant_name",
      });
      this.hasMany(models.drinks, {
        sourceKey: "name",
        foreignKey: "restaurant_name",
      });
    }
  }
  stands.init(
    {
      owner: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "stands",
      tableName: "stands",
      underscored: true,
    },
  );
  return stands;
};
