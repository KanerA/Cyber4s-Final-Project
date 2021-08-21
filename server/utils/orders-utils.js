const OrderModel =
  process.env.NODE_ENV === "test"
    ? require("../mongoModel/testMongoModel")
    : require("../mongoModel/mongoModel");

const newOrder = async (req, res) => {
  const { body } = req;
  const newOrder = new OrderModel({
    customerName: body.customerName,
    dish: body.dish,
    drink: body.drink,
    username: body.username,
    totalPrice: body.totalPrice,
    createdAt: body.createdAt,
  });

  newOrder.save().then((data, err) => {
    if (!err) {
      const io = req.app.get("socketio");
      io.emit("getNewOrder", data);
      res.send(data.customerName + "'s order accepted!");
    } else {
      console.log(err);
    }
  });
};

const getOrders = async (req, res) => {
  const { username } = req.params;
  OrderModel.find({ username: username }, (err, ordersArr) => {
    if (!err) {
      // req.io.on("getAllOrders", () => {
      //   req.io.emit("receiveOrders", ordersArr);
      // });
      res.json(ordersArr);
    } else {
      console.log(err);
    }
  });
};

const getOrderHistory = async (req, res) => {
  const { username } = req.params;
  const limit = +req.query.h; // turn to Number
  const orderHistory = await OrderModel.find({
    username: username,
  });
  if (!limit) res.json(orderHistory);
  const wantedOrderHistory = orderHistory.splice(0, limit);
  res.json(wantedOrderHistory);
};

const getDone = async (req, res) => {
  const { done, username } = req.query;
  const orderList = await OrderModel.find({
    done,
    username: username,
  });
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
  req.io.emit("getCanceledOrder", updated);
  res.json(updated);
};

const getNonCanceled = async (req, res) => {
  const { username } = req.params;
  const nonCanceledOrders = await OrderModel.find({
    username,
    canceled: false,
  });
  res.json(nonCanceledOrders);
};

const getCanceled = async (req, res) => {
  const { username } = req.params;
  const canceledOrders = await OrderModel.find({
    username,
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
