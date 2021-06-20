"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("stands", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      owner: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
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
    await queryInterface.dropTable("stands");
  },
};
