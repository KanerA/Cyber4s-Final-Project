const orderModel = require("../mongoModel/mongoModel");

const newOrder = async (req, res) => {
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
  };

const getOrders = async (req, res) => {
  const { restaurantName } = req.params;
  OrderModel.find({ restaurantName: restaurantName }, (err, ordersArr) => {
    if (!err) {
      res.json(ordersArr);
    } else {
      console.log(err);
    }
  });
};

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

const orderDone = async (req, res) => {
  const {d, id} = req.query;
  const updated = await orderModel.findByIdAndUpdate(id, { done: d },{ new: true, lean: true });
  res.json(updated);
};

module.exports = { newOrder, getOrders, getOrderHistory, getDone, orderDone };
