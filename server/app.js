const express = require("express");
const app = express();
const dishes = require("./routes/dishes");
const drinks = require("./routes/drinks");
const orders = require("./routes/orders");
const stands = require("./routes/stands");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TEST");
});

app.use("/dishes", dishes);
app.use("/drinks", drinks);
app.use("/orders", orders);
app.use("/stands", stands);

module.exports = app;
