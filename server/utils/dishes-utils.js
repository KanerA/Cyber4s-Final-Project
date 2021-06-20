const { Dishes } = require("../models");

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

module.exports = { getAllDishes };
