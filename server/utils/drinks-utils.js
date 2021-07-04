const { Drinks } = require("../models");

const getAllRestaurantDrinks = (req, res) => {
  const { user_name } = req.params;
  if(req.user.user_name !== user_name) return res.sendStatus(403);
  Drinks.findAll({
    where: { restaurant_name: user_name },
  }).then((drinks) => {
    const allDrinks = drinks.map((drink) => drink.toJSON());
    res.send(
      allDrinks.map((drink) => {
        return {
          name: drink.name,
          description: drink.description,
          restaurantName: drink.user_name,
          price: drink.price,
          alcoholic: drink.alcoholic,
        };
      }),
    );
  });
};

const createNewDrink = (req, res) => {
  const { body } = req;
  if(req.user.user_name !== body.user_name) return res.sendStatus(403);
  Drinks.create(body).then(() => res.send("new drink created"));
};

module.exports = { getAllRestaurantDrinks, createNewDrink };
