'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Orders, {
        sourceKey: "name",
        foreignKey: "restaurant_name",
      });
      this.hasMany(models.Dishes, {
        sourceKey: "name",
        foreignKey: "restaurant_name",
      });
      this.hasMany(models.Drinks, {
        sourceKey: "name",
        foreignKey: "restaurant_name",
      });
    }
  };
  Stands.init({
    owner: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stands',
    underscored: true,
  });
  return Stands;
};