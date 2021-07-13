import React, { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import { network } from "../utils/networkWrapper";
import { socket } from "../socket";

function History({ restaurantUser }) {
  const [orders, setOrders] = useState([]);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.on("getNewOrder", (newOrder) => {
        setOrders((prev) => [...prev, newOrder]);
      });
    });
    network
      .get(`/orders/${restaurantUser}`)
      .then((res) => {
        const doneAndCanceled = res.data?.filter((order) => {
          console.log(order);
          if (order.done || order.canceled) return order;
        });
        setOrders(doneAndCanceled);
      })
      .catch((err) => console.log(err));
    console.log(orders);
  }, []);

  return (
    <div className="orders">
      {orders?.map((order, i) => {
        return <HistoryItem order={order} />;
      })}
    </div>
  );
}

export default History;
