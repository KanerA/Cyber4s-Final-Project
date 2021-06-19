const { Router } = require("express");
const orders = Router();
const models = require("../models");
const { getOrderHistory } = require('../utils/orders-utils');

orders.get("/:restaurantName", async (req, res) => {
  const { restaurantName } = req.params;
  const ordersTable = await models.Orders.findAll({
    where: { restaurant_name: restaurantName },
  });
  const restaurantOrders = ordersTable.map((order) => {
    return {
      customerName: order.customer,
      dish: order.dish,
      drink: order.drink,
      restaurantName: order.restaurant_name,
      orderAt: new Date(order.createdAt).toLocaleString(),
    };
  });
  res.send(restaurantOrders);
});

orders.post("/", async (req, res) => {
  const { body } = req;
  const orderToSave = {
    customer: body.customer,
    dish: body.dish,
    drink: body.drink,
    restaurant_name: body.restaurantName,
  };
  models.Orders.create(orderToSave);
  res.send("posted");
});

orders.get('/', getOrderHistory);

module.exports = orders;
