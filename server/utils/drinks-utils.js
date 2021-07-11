const { Drinks } = require("../models");

const getAllRestaurantDrinks = (req, res) => {
  const { user_name } = req.params;
  if(req.user.user_name !== user_name) return res.sendStatus(403);
  Drinks.findAll({
    where: { restaurant_name: user_name },
  })
    .then((drinks) => {
      const allDrinks = drinks.map((drink) => drink.toJSON());
      res.json(
        allDrinks.map((drink) => {
          return {
            name: drink.name,
            description: drink.description,
            restaurantName: drink.user_name,
            price: drink.price,
            alcoholic: drink.alcoholic,
          };
        })
      )
    })
    .catch(err => console.log(err))
};

const createNewDrink = (req, res) => {
  const { body: { name, description, user_name, price, alcoholic }} = req;
  if(req.user.user_name !== user_name) return res.sendStatus(403);
  Drinks.create({
    name,
    description,
    restaurant_name: user_name,
    price,
    alcoholic,
  }).then((_) => {
    console.log(_)
    res.send("new drink created")
  });
};

const deleteDrink = (req, res) => {
  const { user_name, drink_name } = req.params;
  Drinks.destroy({
    where: {
      restaurant_name: user_name,
      name: drink_name,
    }
  })
  .then(_ => {
    console.log('Drink deleted')
    res.json({ message: 'Drink deleted successfully' });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ message: err.message , error: err })
  })
};

module.exports = { getAllRestaurantDrinks, createNewDrink, deleteDrink };