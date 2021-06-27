const { Router } = require("express");
const orders = Router();
const {
  newOrder,
  getOrders,
  getOrderHistory,
  getDone,
  orderDoneCancel,
  getNonCanceled,
  getCanceled,
} = require("../utils/orders-utils");

orders.get("/:restaurantName", getOrders);
orders.post("/:restaurantName", newOrder);
orders.get("/:restaurantName/history", getOrderHistory);
orders.get("/done", getDone);
orders.patch("/done", orderDoneCancel);
orders.get('/:restaurantName/active', getNonCanceled);
orders.get('/:restaurantName/nonactive', getCanceled);

module.exports = orders;
