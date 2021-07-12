require("dotenv").config();
const app = require("./app");
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  req.io = io;
  next();
});
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.set("socketio", io);

io.on("connection", (socket) => {
  console.log("connected with id: ", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
  console.log(`app is listening on port - ${PORT}`);
  console.log(`work environment - ${env}`);
});
