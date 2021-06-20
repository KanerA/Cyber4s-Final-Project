"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("stands", [
      {
        owner: "Tom",
        name: "malabi4u",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        owner: "Abdul",
        name: "fetal falafel",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        owner: "Yosef ",
        name: "shnitzel corp",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        owner: "Avi",
        name: "humus road",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        owner: "Shaked",
        name: "shake!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        owner: "Jake",
        name: "burgerHub!",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stands", null, {});
  },
};
