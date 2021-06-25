const { Dishes } = require("../models");

const getAllRestaurantDishes = (req, res) => {
  const { restaurantName } = req.params;
  Dishes.findAll({
    where: { restaurant_name: restaurantName },
  }).then((res) => {
    const allDishes = res.map((dish) => dish.toJSON());
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
  });
};

const createNewDish = (req, res) => {
  const { body } = req;
  Dishes.create(body).then(() => res.send("new dish created"));
};

module.exports = { getAllRestaurantDishes, createNewDish };
