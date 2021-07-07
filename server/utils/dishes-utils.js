const { Dishes } = require("../models");

const getAllRestaurantDishes = (req, res) => {
  const { user_name } = req.params;
  if(req.user.user_name !== user_name) return res.sendStatus(403); // compares the token to the wanted restaurant
  Dishes.findAll({
    where: { restaurant_name: user_name },
  })
    .then((dishes) => {
    const allDishes = dishes.map((dish) => dish.toJSON());
    res.json(
      allDishes.map((dish) => {
        return {
          name: dish.name,
          description: dish.description,
          user_name: dish.user_name,
          price: dish.price,
        };
      }),
    );
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
};

const createNewDish = (req, res) => {
  const { body: { name, description, user_name, price, alcoholic }} = req;
  if(user_name !== req.user.user_name) return res.sendStatus(403);
  Dishes.create({
    name,
    description,
    restaurant_name: user_name,
    price,
  }).then(() => res.send("new dish created"));
};

module.exports = { getAllRestaurantDishes, createNewDish };
