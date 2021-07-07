const express = require("express");
const app = express();
const io = require("socket.io")(6789, {
  cors: {
    origin: "*",
  },
});

const dishes = require("./routes/dishes");
const drinks = require("./routes/drinks");
const orders = require("./routes/orders");
const stands = require("./routes/stands");
const auth = require("./routes/auth");

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("connected with id: ", socket.id);
});

app.get("/", (req, res) => {
  res.json({ message: "TEST" });
});

app.use("/dishes", dishes);
app.use("/drinks", drinks);
app.use("/orders", orders);
app.use("/stands", stands);
app.use("/auth", auth);

// app.post('/token', )

module.exports = app;
