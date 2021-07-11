const { Router } = require("express");
const { validateToken } = require("../middlewares");
const routeDrinks = Router();
const {
  getAllRestaurantDrinks,
  createNewDrink,
  deleteDrink,
} = require("../utils/drinks-utils");

routeDrinks.get("/:user_name", validateToken, getAllRestaurantDrinks);
routeDrinks.post("/", validateToken, createNewDrink);
routeDrinks.delete('/:user_name/:drink_name', deleteDrink);

module.exports = routeDrinks;
