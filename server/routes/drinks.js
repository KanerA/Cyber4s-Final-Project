const { Router } = require("express");
const { validateToken } = require("../middlewares");
const routeDrinks = Router();
const {
  getAllRestaurantDrinks,
  createNewDrink,
} = require("../utils/drinks-utils");

routeDrinks.get("/:restaurantName", validateToken, getAllRestaurantDrinks);
routeDrinks.post("/", validateToken, createNewDrink);

module.exports = routeDrinks;
