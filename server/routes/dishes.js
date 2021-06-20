const { Router } = require("express");
const dishes = Router();
const {
  getAllDishes,
  getAllRestaurantDishes,
  createNewDish,
} = require("../utils/dishes-utils");

dishes.get("/", getAllDishes);
dishes.get("/:restaurantName", getAllRestaurantDishes);
dishes.post("/", createNewDish);

module.exports = dishes;
