const { Router } = require('express');
const routeDishes = Router();

routeDishes.get('/', (req, res) => {
    res.json({});
});

module.exports = routeDishes;