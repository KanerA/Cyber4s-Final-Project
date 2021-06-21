const { Router } = require("express");
const orders = Router();
const { newOrder, getOrders, getOrderHistory, getDone } = require("../utils/orders-utils");

const OrderModel = require("../mongoModel/mongoModel");

orders.get("/:restaurantName", getOrders);

orders.post("/:restaurantName", newOrder);
  
  // orders.patch(:/)
  orders.get('/', getOrderHistory);
  orders.get('/done', getDone);
  
  module.exports = orders;
