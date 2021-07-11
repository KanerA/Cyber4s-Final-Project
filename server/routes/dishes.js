const { Router } = require("express");
const { validateToken } = require("../middlewares");
const dishes = Router();
const {
  getAllRestaurantDishes,
  createNewDish,
  deleteDish,
} = require("../utils/dishes-utils");

dishes.get("/:user_name", validateToken, getAllRestaurantDishes);
dishes.post("/", validateToken, createNewDish);
dishes.delete('/:user_name/:dish_name', deleteDish)

module.exports = dishes;
