require('dotenv').config();
const mongoose = require('mongoose');

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


const testOrderSchema = new mongoose.Schema({
    customerName: String,
    dish: [{ type: Object }],
    drink: [{ type: Object }],
    restaurantName: String,
    totalPrice: Number,
    done: { type: Boolean, default: false },
    canceled: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
  });

  module.exports = new mongoose.model('testOrder', testOrderSchema); // create a separate DB for testing