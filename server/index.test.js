const request = require('supertest');
const app = require('./app');

const newOrder = {
    customerName: 'Assaf',
    dish: [{
        name: 'Pizza',
        price: 10,
        notes: 'Very good pizza',
        amount: 2,
      }],
    drink: [{
        name: 'Pizza',
        price: 10,
        note: 'none',
        amount: 15,
      }],
    createdAt: Date.now(),
    restaurantName: 'Assaf\'s pizza',
    totalPrice: 170,
  };