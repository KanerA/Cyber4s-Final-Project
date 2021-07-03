const { Drinks } = require("../models");

const getAllRestaurantDrinks = (req, res) => {
  const { restaurantName } = req.params;
  if(req.user.name !== restaurantName) return res.sendStatus(403);
  Drinks.findAll({
    where: { restaurant_name: restaurantName },
  }).then((drinks) => {
    const allDrinks = drinks.map((drink) => drink.toJSON());
    res.send(
      allDrinks.map((drink) => {
        return {
          name: drink.name,
          description: drink.description,
          restaurantName: drink.restaurantName,
          price: drink.price,
          alcoholic: drink.alcoholic,
        };
      }),
    );
  });
};

const createNewDrink = (req, res) => {
  const { body } = req;
  if(req.user.name !== body.restaurant_name) return res.sendStatus(403);
  Drinks.create(body).then(() => res.send("new drink created"));
};

module.exports = { getAllRestaurantDrinks, createNewDrink };
