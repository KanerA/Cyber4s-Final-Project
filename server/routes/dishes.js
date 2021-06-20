const { Router } = require("express");
const dishes = Router();
const models = require("../models");

dishes.get("/", async (req, res) => {
  const dishTable = await models.Dishes.findAll({
    where: {},
  });
  const allDishes = dishTable.map((dish) => {
    return {
      name: dish.name,
      description: dish.description,
      restaurantName: dish.restaurantName,
      price: dish.price,
    };
  });
  res.json(allDishes);
});

module.exports = dishes;
