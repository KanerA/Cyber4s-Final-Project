const { Router } = require("express");
const { validateToken } = require("../middlewares");
const dishes = Router();
const {
  getAllRestaurantDishes,
  createNewDish,
} = require("../utils/dishes-utils");

dishes.get("/:user_name", validateToken, getAllRestaurantDishes);
dishes.post("/", validateToken, createNewDish);

module.exports = dishes;
