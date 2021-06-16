const { Router } = require('express');
const orders = Router();

orders.get('/', (req, res) => {
    res.json({});
});

module.exports = orders;