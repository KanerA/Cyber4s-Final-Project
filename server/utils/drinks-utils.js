const { Drinks } = require("../models");

const getAllRestaurantDrinks = async (req, res) => {
  const { restaurantName } = req.params;
  const allDrinks = await Drinks.findAll({
    where: { restaurant_name: restaurantName },
  }).then((res) => res.map((drink) => drink.toJSON()));
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
};

const createNewDrink = async (req, res) => {
  const { body } = req;
  Drinks.create(body).then(() => res.send("new drink created"));
};

module.exports = { getAllRestaurantDrinks, createNewDrink };
