import socketIOClient from "socket.io-client";
import env from "./env";
const endPoint = `http://${env.IP}:6789`;
export const socket = socketIOClient(endPoint, {
  transports: ["websocket"],
});
