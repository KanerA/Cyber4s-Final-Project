"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dishes extends Model {
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
  dishes.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      restaurant_name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dishes",
      tableName: "dishes",
      underscored: true,
    },
  );
  return dishes;
};
