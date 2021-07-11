'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stands extends Model {

    static associate(models) {
      this.hasMany(models.Dishes, {
        sourceKey: "user_name",
        foreignKey: "restaurant_name",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Drinks, {
        sourceKey: "user_name",
        foreignKey: "restaurant_name",
        onDelete: "CASCADE",
      });
    }
  };
  Stands.init({
    user_name: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stands',
    underscored: true,
  });
  return Stands;
};