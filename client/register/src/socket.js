import socketIOClient from "socket.io-client";
const endPoint = "http://localhost:8080";
export const socket = socketIOClient(endPoint, {
  transports: ["websocket"],
});
