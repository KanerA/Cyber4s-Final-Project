const request = require('supertest');
const OrderModel = require('./mongoModel/testMongoModel');
const app = require('./app');

const seedArr = [
    {
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
    },{
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
    },{
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
    },{
        customerName: 'Assaf',
        dish: [{
            name: 'Pizza',
            price: 10,
            notes: 'Very good pizza',
            amount: 2,
          }],
        drink: [{
            name: 'water',
            price: 1,
            note: 'none',
            amount: 3,
          }],
        createdAt: Date.now(),
        restaurantName: 'Assaf\'s pizza',
        totalPrice: 170,
    },{
        customerName: 'David',
        dish: [{
            name: 'Hamburger',
            price: 10,
            notes: 'Very good hamburger',
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
    },{
        customerName: 'Assaf',
        dish: [{
            name: 'Spaghetti',
            price: 15,
            notes: 'Very good spaghetti',
            amount: 1,
          }],
        drink: [{
            name: 'Cola',
            price: 10,
            note: 'none',
            amount: 15,
          }],
        createdAt: Date.now(),
        restaurantName: 'Assaf\'s pizza',
        totalPrice: 150,
    },{
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
    },{
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
    },{
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
    },{
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
    }
]

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

const mockParams = {
    h: 10, // for get history test, change for other history length
};

beforeAll(async () => {
    await OrderModel.insertMany(seedArr)
    console.log('Seed Successful');
});

afterAll(async () => {
    await OrderModel.remove({});
});

describe('Test orders routes', () => {
    it('Should GET all orders by the restaurant\'s name', async () => {
        const res = await request(app).get('/orders/Assaf\'s pizza');
        expect(res.status).toBe(200);
    });

    test('Create new order', async () => {
        const res = await request(app).post('/orders/Assaf\'s pizza').send(newOrder)
        expect(res.status).toBe(200);
        expect(res.text).toBe('Assaf\'s order accepted!');
    });

    test('Getting order history', async () => {
        const res = await request(app)
            .get('/orders/Assaf\'s pizza/history')
            .query({ h: mockParams.h });
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(mockParams.h)
    });
});

describe('Test dish routes', () => {
    it('Should get all restaurant dishes', async () => {
        const res = await request(app).get('/dishes/Pizza');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });
});