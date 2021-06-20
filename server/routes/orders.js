const { Router } = require("express");
const orders = Router();
const models = require("../models");
const { getOrderHistory } = require("../utils/orders-utils");
const mongoose = require("mongoose");

// routeOrders.get("/:restaurantName", async (req, res) => {
//   const { restaurantName } = req.params;
//   const ordersTable = await models.Orders.findAll({
//     where: { restaurant_name: restaurantName },
//   });
//   const restaurantOrders = ordersTable.map((order) => {
//     return {
//       customerName: order.customer,
//       dish: order.dish,
//       drink: order.drink,
//       restaurantName: order.restaurant_name,
//       orderAt: new Date(order.createdAt).toLocaleString(),
//     };
//   });
//   res.send(restaurantOrders);
// });

// routeOrders.post("/", async (req, res) => {
//   const { body } = req;
//   const orderToSave = {
//     customer: body.customer,
//     dish: body.dish,
//     drink: body.drink,
//     restaurant_name: body.restaurantName,
//   };
//   models.Orders.create(orderToSave);
//   res.send("posted");
// });

// routeOrders.get('/', getOrderHistory);

const OrderModel = require("../mongoModel/mongoModel");

orders.get("/:restaurantName", async (req, res) => {
  const { restaurantName } = req.params;
  OrderModel.find({ restaurantName: restaurantName }, (err, ordersArr) => {
    if (!err) {
      res.json(ordersArr);
    } else {
      console.log(err);
    }
  });
});

orders.post("/:restaurantName", async (req, res) => {
  const { body } = req;
  const newOrder = new OrderModel({
    customerName: body.customerName,
    dish: body.dish,
    drink: body.drink,
    restaurantName: body.restaurantName,
    _id: body.id,
  });

  newOrder.save().then((data, err) => {
    if (!err) {
      res.send(
        data.customerName + "s order accepted! order ID: " + counter + 1
      );
    } else {
      console.log(err);
    }
  });
});

// orders.patch(:/)

module.exports = orders;
