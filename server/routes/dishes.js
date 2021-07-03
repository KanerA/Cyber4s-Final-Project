const { Router } = require("express");
const { validateToken } = require("../middlewares");
const dishes = Router();
const {
  getAllRestaurantDishes,
  createNewDish,
} = require("../utils/dishes-utils");

dishes.get("/:restaurantName", validateToken, getAllRestaurantDishes);
dishes.post("/", validateToken, createNewDish);

module.exports = dishes;
