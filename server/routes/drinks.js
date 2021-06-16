const { Router } = require('express');
const drinks = Router();

drinks.get('/', (req, res) => {
    res.json({});
});

module.exports = drinks;
