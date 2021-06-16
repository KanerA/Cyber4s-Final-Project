"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init(
    {
      customer: DataTypes.STRING,
      dish: DataTypes.STRING,
      drink: DataTypes.STRING,
      restaurant_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "orders",
      underscored: true,
    },
  );
  return orders;
};
