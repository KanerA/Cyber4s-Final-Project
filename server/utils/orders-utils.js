const OrderModel = require("../mongoModel/mongoModel");

const newOrder = async (req, res) => {
  const { body } = req;
  const newOrder = new OrderModel({
    customerName: body.customerName,
    dish: body.dish,
    drink: body.drink,
    restaurantName: body.restaurantName,
  });

  newOrder.save().then((data, err) => {
    if (!err) {
      res.send(data.customerName + "s order accepted!");
    } else {
      console.log(err);
    }
  });
};

const getOrders = async (req, res) => {
  const { restaurantName } = req.params;
  OrderModel.find({ restaurantName: restaurantName }, (err, ordersArr) => {
    if (!err) {
      console.log(ordersArr);
      res.json(ordersArr);
    } else {
      console.log(err);
    }
  });
};

const getOrderHistory = async (req, res) => {
  const { restaurantName } = req.params;
  const limit = +req.query.h; // turn to Number
  console.log(limit);
  const orderHistory = await OrderModel.find({
    restaurantName: restaurantName,
  });
  if (!limit) res.json(orderHistory);
  const wantedOrderHistory = orderHistory.splice(0, limit);
  res.json(wantedOrderHistory);
};

const getDone = async (req, res) => {
  const { done, res_name } = req.query;
  const orderList = await OrderModel.find({
    done,
    restaurantName: res_name,
  });
  res.json(orderList);
};

const orderDoneCancel = async (req, res) => {
  const { d, c, id } = req.query;
  console.log(d, c, id);
  const isDone = d === "true";
  const isCanceled = c === "true";
  let updated;
  if (d)
    updated = await OrderModel.findOneAndUpdate(
      { customerName: id },
      { done: isDone },
      { new: true },
    );
  if (c)
    updated = await OrderModel.findOneAndUpdate(
      { customerName: id },
      { canceled: isCanceled },
      { new: true },
    );
  console.log(updated);
  res.json(updated);
};

module.exports = {
  newOrder,
  getOrders,
  getOrderHistory,
  getDone,
  orderDoneCancel,
};
