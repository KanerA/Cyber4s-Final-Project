const { Router } = require("express");
const orders = Router();
const {
  newOrder,
  getOrders,
  getOrderHistory,
  getDone,
  orderDoneCancel,
} = require("../utils/orders-utils");

orders.get("/:restaurantName", getOrders);
orders.post("/:restaurantName", newOrder);
orders.get("/:restaurantName/history", getOrderHistory);
orders.get("/done", getDone);
orders.patch("/done", orderDoneCancel);

module.exports = orders;
