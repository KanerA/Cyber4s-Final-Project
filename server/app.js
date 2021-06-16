const express = require('express');
const app = express();
const dishes = require('./routes/dishes');
const drinks = require('./routes/drinks');
const orders = require('./routes/orders');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Fuck U');
});

app.use('/dishes', dishes);
app.use('/drinks', drinks);
app.use('/orders', orders);

module.exports = app;