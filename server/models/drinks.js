'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drinks extends Model {

    static associate(models) {
      this.belongsTo(models.stands, {
        foreignKey: {
          name: "restaurant_name",
          allowNull: true,
        },
        sourceKey: "user_name",
      });
    }
  };
  drinks.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      alcoholic: DataTypes.BOOLEAN,
      options: DataTypes.STRING,
      restaurant_name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Drinks',
      tableName: 'drinks',
      underscored: true,
    },
  );
  return drinks;
};