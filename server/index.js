require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`app is listening on port - ${PORT}`);
        console.log(`work environment - ${env}`);
    });
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

