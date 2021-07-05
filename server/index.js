require("dotenv").config();
const app = require("./app");
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const OrderModel = require("./mongoModel/mongoModel");
io.on("connection", (socket) => {
  console.log("connected with id: ", socket.id);
  const getOrders = async (username) => {
    // const { username } = req.params;
    console.log("username", username);
    OrderModel.find({ username: username }, (err, ordersArr) => {
      if (!err) {
        // res.json(ordersArr);
        console.log(ordersArr);
        socket.emit("receiveOrders", ordersArr);
        socket.emit("receiveOrdersApp", { ordersArr });
      } else {
        console.log("err");
      }
    });
    // OrderModel.find({ username: username }, (err, res) => {
    //   console.log("res", res);
    //   io.emit("receiveOrders", res);
    // });
    console.log("object");
  };

  socket.on("sendOrders", getOrders);
  //   socket.on('')
});

server.listen(PORT, () => {
  console.log(`app is listening on port - ${PORT}`);
  console.log(`work environment - ${env}`);
});
