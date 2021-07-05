import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import socketIOClient from "socket.io-client";

function OrderHandler({ restaurant, restaurantUser }) {
  const [orders, setOrders] = useState();
  const endPoint = "http://localhost:8080";
  const socket = socketIOClient(endPoint, {
    transports: ["websocket"],
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("sendOrders", restaurantUser);
      socket.on("receiveOrders", (newOrders) => {
        setOrders(newOrders);
      });
    });
    // axios
    //   .get(`/orders/${restaurantUser}`)
    //   .then((res) => {
    //     setOrders(res.data);
    //   })
    //   .catch((err) => console.log(err));
    // console.log(orders);
  }, []);
  return (
    <div className="orders">
      {orders?.map((order, i) => {
        if (order.canceled === false) {
          return <Order order={order} key={`order ${i}`} />;
        }
      })}
    </div>
  );
}

export default OrderHandler;
