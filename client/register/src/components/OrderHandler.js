import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import socketIOClient from "socket.io-client";

function OrderHandler({ restaurant, restaurantUser }) {
  const [orders, setOrders] = useState([]);
  const [canceled, setCanceled] = useState(false);
  const endPoint = "http://localhost:6789";
  const socket = socketIOClient(endPoint, {
    transports: ["websocket"],
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.on("getNewOrder", (newOrder) => {
        setOrders((prev) => [...prev, newOrder]);
      });
    });
    axios
      .get(`/orders/${restaurantUser}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, [, orders]);
  const cancelOrder = (order) => {
    alert(`${order.customerName}'s order is canceled!`);

    axios
      .patch(`/orders/done/?c=true&id=${order._id}`)
      .then((res) => setCanceled(true))
      .catch((err) => console.log(err));
  };
  return (
    <div className="orders">
      {orders?.map((order, i) => {
        if (order.canceled === false) {
          return (
            <Order order={order} cancelOrder={cancelOrder} key={`order ${i}`} />
          );
        }
      })}
    </div>
  );
}

export default OrderHandler;
