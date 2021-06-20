'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('drinks', [
        {
          name: 'Orange Juice',
          description: 'Freshly squeezed oranges served in a cup with frozen angel\'s tears',
          restaurant_name: 'malabi4u',
          alcoholic: false,
          price: 10,
        },
        {
          name: 'Orange Juice',
          description: 'Freshly squeezed oranges served in a cup with frozen angel\'s tears',
          restaurant_name: 'shnitzel corp',
          alcoholic: false,
          price: 12,
        },
        {
          name: 'Orange Juice',
          description: 'Freshly squeezed oranges served in a cup with frozen angel\'s tears',
          restaurant_name: 'fetal falafel',
          alcoholic: false,
          price: 10,
        },
        {
          name: 'Lemonade Juice',
          description: 'Lemons straight from the field, to our juicer (Pishoto) and into your cup',
          restaurant_name: 'malabi4u',
          alcoholic: false,
          price: 10,
        },
        {
          name: 'Lemonade Juice',
          description: 'Lemons straight from the field, to our juicer (Pishoto) and into your cup',
          restaurant_name: 'shnitzel corp',
          alcoholic: false,
          price: 12,
        },
        {
          name: 'Lemonade Juice',
          description: 'Lemons straight from the field, to our juicer (Pishoto) and into your cup',
          restaurant_name: 'shake!',
          alcoholic: false,
          price: 15,
        },
        {
          name: 'Cosmopolitan',
          description: 'An exquisite mixture of Prime Vodka, Cranberry juice, citrus & triple sec, served in a chilled martini glass',
          restaurant_name: 'hummus road',
          alcoholic: true,
          price: 54,
        },
        {
          name: 'Cosmopolitan',
          description: 'An exquisite mixture of Prime Vodka, Cranberry juice, citrus & triple sec, served in a chilled martini glass',
          restaurant_name: 'burgerHub',
          alcoholic: true,
          price: 49,
        },
        {
          name: 'Cosmopolitan',
          description: 'An exquisite mixture of Prime Vodka, Cranberry juice, citrus & triple sec, served in a chilled martini glass',
          restaurant_name: 'shake!',
          alcoholic: true,
          price: 62,
        },
        {
          name: 'Gin & Tonic',
          description: 'Highball filled to the brim with an exact mixture of tastes of london dry gin and our home-made tonic.',
          restaurant_name: 'burgerHub',
          alcoholic: true,
          price: 43,
        },
        {
          name: 'Gin & Tonic',
          description: 'Exactly what you think',
          restaurant_name: 'malabi4u',
          alcoholic: true,
          price: 20,
        },
        {
          name: 'Coca-Cola',
          description: 'The original taste, the original recipe',
          restaurant_name: 'malabi4u',
          alcoholic: false,
          price: 11,
        },
        {
          name: 'Coca-Cola',
          description: 'The original taste, the original recipe',
          restaurant_name: 'shnitzel corp',
          alcoholic: false,
          price: 10,
        },
        {
          name: 'Coca-Cola',
          description: 'The original taste, the original recipe',
          restaurant_name: 'fetal falafel',
          alcoholic: false,
          price: 13,
        },
        {
          name: 'Coca-Cola',
          description: 'The original taste, the original recipe',
          restaurant_name: 'hummus road',
          alcoholic: false,
          price: 12,
        },
        {
          name: 'weihenstephaner',
          description: 'The world\'s oldest brewery',
          restaurant_name: 'burgerHub',
          alcoholic: true,
          price: 25,
        },
        {
          name: 'weihenstephaner',
          description: 'The world\'s oldest brewery',
          restaurant_name: 'burgerHub',
          alcoholic: true,
          price: 25,
        },
        {
          name: 'weihenstephaner',
          description: 'The world\'s oldest brewery',
          restaurant_name: 'shake!',
          alcoholic: true,
          price: 34,
        },
        {
          name: 'weihenstephaner',
          description: 'The world\'s oldest brewery',
          restaurant_name: 'fetal falafel',
          alcoholic: true,
          price: 22,
        },
      ]
      .map(drink => {
        drink.createdAt = new Date();
        drink.updatedAt = new Date();
        return drink;
      }),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('drinks', null, {});
  }
};
