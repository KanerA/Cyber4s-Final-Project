"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("stands", [
      {
        owner: "Tom",
        name: "malabi4u",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        owner: "Abdul",
        name: "fetal falafel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        owner: "Yosef ",
        name: "shnitzel corp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        owner: "Avi",
        name: "humus road",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        owner: "Shaked",
        name: "shake!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        owner: "Jake",
        name: "burgerHub!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stands", null, {});
  },
};
