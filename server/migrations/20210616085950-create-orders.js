"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      customer: {
        type: Sequelize.STRING,
      },
      dish: {
        type: Sequelize.STRING,
      },
      drink: {
        type: Sequelize.STRING,
      },
      restaurant_name: {
        type: Sequelize.STRING,
        foreignKey: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  },
};
