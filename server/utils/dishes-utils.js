const { Dishes } = require("../models");

//   ---NO USE CURRENTLY---

const getAllDishes = async (req, res) => {
  const dishTable = await Dishes.findAll({}).then((result) =>
    result.map((dish) => dish.toJSON()),
  );
  const allDishes = dishTable.map((dish) => {
    return {
      name: dish.name,
      description: dish.description,
      restaurantName: dish.restaurantName,
      price: dish.price,
    };
  });
  console.log("req");
  res.send(allDishes);
};

///

const getAllRestaurantDishes = async (req, res) => {
  const { restaurantName } = req.params;
  const allDishes = await Dishes.findAll({
    where: { restaurant_name: restaurantName },
  }).then((res) => res.map((dish) => dish.toJSON()));
  res.send(
    allDishes.map((dish) => {
      return {
        name: dish.name,
        description: dish.description,
        restaurantName: dish.restaurantName,
        price: dish.price,
      };
    }),
  );
};

const createNewDish = async (req, res) => {
  const { body } = req;
  console.log(body);
  Dishes.create(body).then(() => res.send("new dish created"));
};

module.exports = { getAllDishes, getAllRestaurantDishes, createNewDish };
