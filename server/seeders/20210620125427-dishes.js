"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("dishes", [
      {
        name: "salad",
        description: "green salad",
        restaurant_name: "malabi4u",
        price: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "falafel",
        description: "green falafel",
        restaurant_name: "fetal falafel",
        price: 18,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "shawarma",
        description: "green shwarma",
        restaurant_name: "fetal falafel",
        price: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "hamburger",
        description: "green hamburger",
        restaurant_name: "burgerHub",
        price: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "ice cream cake",
        description: "green ice cream cake",
        restaurant_name: "shake!",
        price: 24,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "just humus",
        description: "green humus",
        restaurant_name: "humus road",
        price: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "fish&chips",
        description: "green fish&chips",
        restaurant_name: "shnitzel corp",
        price: 27,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "fish&chips",
        description: "green fish&chips",
        restaurant_name: "fetal falafel",
        price: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "just humus",
        description: "green humus",
        restaurant_name: "fetal falafel",
        price: 11,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "chicken burger",
        description: "green chicken burger",
        restaurant_name: "burgerHub",
        price: 36,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "cake",
        description: "green cake",
        restaurant_name: "malabi4u",
        price: 31,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "pizza",
        description: "green pizza",
        restaurant_name: "shake!",
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "STEAK",
        description: "green burgerHub",
        restaurant_name: "burgerHub",
        price: 31,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "piece of bread and shnitzel",
        description: "green piece of bread and shnitzel",
        restaurant_name: "shnitzel corp",
        price: 99,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("dishes", null, {});
  },
};
