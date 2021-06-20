const { Router } = require("express");
const dishes = Router();
const {
  getAllDishes,
  getAllRestaurantDishes,
} = require("../utils/dishes-utils");

dishes.get("/", getAllDishes);
dishes.get("/:restaurantName", getAllRestaurantDishes);

module.exports = dishes;
