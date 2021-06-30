const OrderModel = 
  process.env.NODE_ENV === 'test' 
  ? require('../mongoModel/testMongoModel') 
  : require("../mongoModel/mongoModel");

const newOrder = async (req, res) => {
  const { body } = req;
  const newOrder = new OrderModel({
    customerName: body.customerName,
    dish: body.dish,
    drink: body.drink,
    restaurantName: body.restaurantName,
    totalPrice: body.totalPrice,
  });

  newOrder.save().then((data, err) => {
    if (!err) {
      res.send(data.customerName + "\'s order accepted!");
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
  const { done, restaurantName } = req.query;
  const orderList = await OrderModel.find({
    done,
    restaurantName: restaurantName,
  });
  console.log(orderList);
  res.json(orderList);
};

const orderDoneCancel = async (req, res) => {
  const { d, c, id } = req.query;
  const isDone = d ? d == "true" : undefined;
  const isCanceled = c ? c == "true" : undefined;
  let updated;
  if (d)
    updated = await OrderModel.findOneAndUpdate(
      { _id: id },
      { done: isDone },
      { new: true },
    );
  if (c)
    updated = await OrderModel.findOneAndUpdate(
      { _id: id },
      { canceled: isCanceled },
      { new: true },
    );
  console.log(d, c, id);
  res.json(updated);
};

const getNonCanceled = async (req, res) => {
  const { restaurantName } = req.params;
  const nonCanceledOrders = await OrderModel.find({
    restaurantName,
    canceled: false,
  });
  res.json(nonCanceledOrders);
};

const getCanceled = async (req, res) => {
  const { restaurantName } = req.params;
  const canceledOrders = await OrderModel.find({
    restaurantName,
    canceled: true,
  });
  res.json(canceledOrders);
};

module.exports = {
  newOrder,
  getOrders,
  getOrderHistory,
  getDone,
  orderDoneCancel,
  getNonCanceled,
  getCanceled,
};
