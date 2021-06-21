const { Router } = require("express");
const orders = Router();
const { 
  newOrder,
  getOrders,
  getOrderHistory,
  getDone,
  orderDone
} = require("../utils/orders-utils");

orders.get("/:restaurantName", getOrders);
orders.post("/:restaurantName", newOrder);  
orders.get('/', getOrderHistory);
orders.get('/done', getDone);
orders.patch('/done', orderDone);
  
  module.exports = orders;
