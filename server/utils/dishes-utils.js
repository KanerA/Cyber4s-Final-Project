const { Dishes } = require("../models");

const getAllRestaurantDishes = (req, res) => {
  const { restaurantName } = req.params;
  if(req.user.name !== restaurantName) return res.sendStatus(403); // compares the token to the wanted restaurant
  Dishes.findAll({
    where: { restaurant_name: restaurantName },
  }).then((dishes) => {
    const allDishes = dishes.map((dish) => dish.toJSON());
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
  if(body.restaurant_name !== req.user.name) return res.sendStatus(403);
  Dishes.create(body).then(() => res.send("new dish created"));
};

module.exports = { getAllRestaurantDishes, createNewDish };
