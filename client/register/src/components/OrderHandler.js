import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import socketIOClient from "socket.io-client";

function OrderHandler({ restaurant, restaurantUser }) {
  const [orders, setOrders] = useState([]);
  const endPoint = "http://localhost:6789";
  const socket = socketIOClient(endPoint, {
    // transports: ["websocket"],
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      // socket.emit("sendOrders", restaurantUser);
      socket.on("getNewOrder", (newOrder) => {
        setOrders((prev) => [...prev, newOrder]);
      });
      socket.on("getCanceledOrder", (canceledOrder) => {
        // console.log(orders);
        // const arr = [...orders];
        // // if (orders)
        // for (let order of arr) {
        //   if (order._id === canceledOrder._id) {
        //     order = canceledOrder;
        //   }
        // }

        // setOrders((prev) => [...prev]);

        const updatedOrders = orders?.map((order) => {
          if (order._id === canceledOrder._id) {
            order = canceledOrder;
          }
        });
        console.log(updatedOrders);
        setOrders(updatedOrders);
      });
    });
    axios
      .get(`/orders/${restaurantUser}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
    console.log(orders);
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
