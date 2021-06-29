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

  const mockParams = {
      h: 10, // for get history test, change for other history length
  }

describe('Test orders routes', () => {
    it('Should GET all orders by the restaurant\'s name', async () => {
        const res = await request(app).get('/orders/Assaf\'s pizza');
        expect(res.status).toBe(200);
    });

    test('Create new order', async () => {
        const res = await request(app).post('/orders/Assaf\'s pizza').send(newOrder)
        expect(res.status).toBe(200);
        expect(res.text).toBe('Assafs order accepted!');
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