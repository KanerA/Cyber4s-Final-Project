import socketIOClient from "socket.io-client";
const endPoint = "http://localhost:6789";
export const socket = socketIOClient(endPoint, {
  transports: ["websocket"],
});
