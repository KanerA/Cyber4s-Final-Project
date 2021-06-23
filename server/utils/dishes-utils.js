const { Dishes } = require("../models");

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
    })
  );
};

const createNewDish = async (req, res) => {
  const { body } = req;
  Dishes.create(body).then(() => res.send("new dish created"));
};

module.exports = { getAllRestaurantDishes, createNewDish };
