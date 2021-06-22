const { Router } = require("express");
const dishes = Router();
const {
  getAllRestaurantDishes,
  createNewDish,
} = require("../utils/dishes-utils");

dishes.get("/:restaurantName", getAllRestaurantDishes);
dishes.post("/", createNewDish);

module.exports = dishes;
