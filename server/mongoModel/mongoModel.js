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
  dish: [
    {
      type: Object,
    },
  ],
  drink: [
    {
      type: Object,
    },
  ],
  restaurantName: String,
  done: { type: Boolean, default: false },
  canceled: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  _id: Number,
});

const OrderModel = new mongoose.model("order", OrderSchema);

module.exports = OrderModel;
