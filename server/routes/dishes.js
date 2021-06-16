const { Router } = require('express');
const dishes = Router();

dishes.get('/', (req, res) => {
    res.json({});
});

module.exports = dishes;