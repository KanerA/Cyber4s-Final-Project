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
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Samuel",
        dish: "shawarma,falafel",
        drink: "Orange Juice",
        restaurant_name: "fetal falafel",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Yuval",
        dish: "salad",
        drink: "Lemonade Juice",
        restaurant_name: "malabi4u",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Sean",
        dish: "ice cream cake",
        drink: "weihenstephaner",
        restaurant_name: "shake!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Moshe",
        dish: "just humus,",
        drink: "Coca-Cola,Cosmopolitan",
        restaurant_name: "hummus road",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Jenny",
        dish: "fish&chips,piece of bread and shnitzel",
        drink: "Orange Juice,Lemonade Juice",
        restaurant_name: "shnitzel corp",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Omer",
        dish: "STEAK,hamburger",
        drink: "weihenstephaner,Gin & Tonic",
        restaurant_name: "burgerHub",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "Natan",
        dish: "",
        drink: "Gin & Tonic,Coca-Cola",
        restaurant_name: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "",
        dish: "",
        drink: "",
        restaurant_name: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer: "",
        dish: "",
        drink: "",
        restaurant_name: "",
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
    await queryInterface.bulkDelete("orders", null, {});
  },
};
