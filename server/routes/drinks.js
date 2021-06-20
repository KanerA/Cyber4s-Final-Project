const { Router } = require('express');
const routeDrinks = Router();

routeDrinks.get('/', (req, res) => {
    res.json({});
});

module.exports = routeDrinks;
