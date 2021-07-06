require("dotenv").config();
const app = require("./app");
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

app.listen(PORT, () => {
  console.log(`app is listening on port - ${PORT}`);
  console.log(`work environment - ${env}`);
});
// const OrderModel = require("./mongoModel/mongoModel");
// io.on("connection", (socket) => {
//   console.log("connected with id: ", socket.id);
//   const getOrders = async (username) => {
//     // const { username } = req.params;
//     console.log("username", username);
//     OrderModel.find({ username: username }, (err, ordersArr) => {
//       if (!err) {
//         // res.json(ordersArr);
//         console.log(ordersArr);
//         io.emit("receiveOrders", ordersArr);
//         socket.emit("receiveOrdersApp", { ordersArr });
//       } else {
//         console.log("err");
//       }
//     });
//     // OrderModel.find({ username: username }, (err, res) => {
//     //   console.log("res", res);
//     //   io.emit("receiveOrders", res);
//     // });
//     console.log("object");
//   };

//   //   const newOrder = async (req, res) => {
//   //     const { body } = req;
//   //     const newOrder = new OrderModel({
//   //       customerName: body.customerName,
//   //       dish: body.dish,
//   //       drink: body.drink,
//   //       username: body.username,
//   //       totalPrice: body.totalPrice,
//   //     });

//   //     newOrder.save().then((data, err) => {
//   //       if (!err) {
//   //         res.send(data.customerName + "'s order accepted!");
//   //         socket.emit("sendOrders", data.username);
//   //       } else {
//   //         console.log(err);
//   //       }
//   //     });
//   //   };

//   socket.on("sendOrders", getOrders);
//   //   socket.on('')
// });
