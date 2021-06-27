const { Router } = require("express");
const orders = Router();
const {
  newOrder,
  getOrders,
  getOrderHistory,
  getDone,
  orderDoneCancel,
  getNonCanceled,
} = require("../utils/orders-utils");

orders.get("/:restaurantName", getOrders);
orders.post("/:restaurantName", newOrder);
orders.get("/:restaurantName/history", getOrderHistory);
orders.get("/done", getDone);
orders.patch("/done", orderDoneCancel);
orders.get('/:restaurantName/active', getNonCanceled);

module.exports = orders;
