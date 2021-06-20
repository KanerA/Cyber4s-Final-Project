const { Router } = require("express");
const routeDrinks = Router();
const {
  getAllRestaurantDrinks,
  createNewDrink,
} = require("../utils/drinks-utils");

routeDrinks.get("/:restaurantName", getAllRestaurantDrinks);

routeDrinks.post("/", createNewDrink);

module.exports = routeDrinks;
