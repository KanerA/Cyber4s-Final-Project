import socketIOClient from "socket.io-client";
window.navigator.userAgent = "react-native";
import env from "./env";
const endPoint = `http://${env.IP}:6789`;
export const socket = socketIOClient(endPoint, {
  transports: ["websocket"],
  forceNew: true,
});
