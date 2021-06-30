const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: String,
  dish: [{ type: Object }],
  drink: [{ type: Object }],
  restaurantName: String,
  totalPrice: Number,
  done: { type: Boolean, default: false },
  canceled: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

const OrderModel = new mongoose.model("order", OrderSchema);

module.exports = OrderModel;
