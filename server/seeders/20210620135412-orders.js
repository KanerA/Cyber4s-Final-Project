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
    await queryInterface.bulkInsert("orders", [
      {
        customer: "Assaf",
        dish: "hamburger",
        drink: "Cosmopolitan",
        restaurant_name: "burgerHub",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Samuel",
        dish: "shawarma,falafel",
        drink: "Orange Juice",
        restaurant_name: "fetal falafel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Yuval",
        dish: "salad",
        drink: "Lemonade Juice",
        restaurant_name: "malabi4u",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Sean",
        dish: "ice cream cake",
        drink: "weihenstephaner",
        restaurant_name: "shake!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Moshe",
        dish: "just humus,",
        drink: "Coca-Cola,Cosmopolitan",
        restaurant_name: "hummus road",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Jenny",
        dish: "fish&chips,piece of bread and shnitzel",
        drink: "Orange Juice,Lemonade Juice",
        restaurant_name: "shnitzel corp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Omer",
        dish: "STEAK,hamburger",
        drink: "weihenstephaner,Gin & Tonic",
        restaurant_name: "burgerHub",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "Natan",
        dish: "",
        drink: "Gin & Tonic,Coca-Cola",
        restaurant_name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "",
        dish: "",
        drink: "",
        restaurant_name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer: "",
        dish: "",
        drink: "",
        restaurant_name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("orders", null, {});
  },
};
