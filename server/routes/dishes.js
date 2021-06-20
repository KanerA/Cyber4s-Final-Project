const { Router } = require("express");
const dishes = Router();
const { Dishes } = require("../models");
const { getAllDishes } = require("../utils/dishes-utils");

dishes.get("/", getAllDishes);

module.exports = dishes;
