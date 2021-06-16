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
      this.belongsTo(models.stands, {
        foreignKey: "restaurant_name",
        targetKey: "name",
      });
    }
  }
  orders.init(
    {
      customer: DataTypes.STRING,
      dish: DataTypes.STRING,
      drink: DataTypes.STRING,
      restaurant_name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "orders",
      // underscored: true,
    },
  );
  return orders;
};
