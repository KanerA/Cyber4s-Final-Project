const { Router } = require("express");
const orders = Router();
const { getOrderHistory, getDone } = require("../utils/orders-utils");

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
  orders.get('/', getOrderHistory);
  orders.get('/done', getDone);
  
  module.exports = orders;
