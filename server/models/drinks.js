"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class drinks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      modelName: "drinks",
      underscored: true,
    },
  );
  return drinks;
};
