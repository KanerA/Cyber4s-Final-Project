const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB`);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const OrderSchema = new mongoose.Schema({
  customerName: String,
  dish: String,
  drink: String,
  restaurantName: String,
  createdAt: { type: Date, default: new Date() },
});

const OrderModel = new mongoose.model("order", OrderSchema);

module.exports = OrderModel;
