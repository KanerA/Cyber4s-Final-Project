'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dishes extends Model {

    static associate(models) {
      this.belongsTo(models.Stands, {
        foreignKey: {
          name: "restaurant_name",
          allowNull: true,
        },
        sourceKey: "user_name",
      });
    }
  };
  dishes.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    options: DataTypes.STRING,
    restaurant_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dishes',
    tableName: 'dishes',
    underscored: true,
  });
  return dishes;
};