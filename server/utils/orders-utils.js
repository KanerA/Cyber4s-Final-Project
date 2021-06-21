const orderModel = require("../mongoModel/mongoModel");

const getOrderHistory = async (req, res) => {
  const limit = +req.query.h; // turn to Number
  const orderHistory = await orderModel.find({});
  if(!limit) res.json(orderHistory);
  const wantedOrderHistory = orderHistory.splice(0, limit);
  res.json(wantedOrderHistory);
};

const getDone = async (req, res) => {
  const { done, res_name } = req.query;
  const orderList = await orderModel.find({
    done,
    restaurantName: res_name,
  });
  res.json(orderList);
};

module.exports = { getOrderHistory, getDone };
