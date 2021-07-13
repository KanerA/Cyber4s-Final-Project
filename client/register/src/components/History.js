import React, { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import { network } from "../utils/networkWrapper";
import { socket } from "../socket";
import "./styles/History/History.css";

function History({ restaurantUser }) {
  const [orders, setOrders] = useState([]);

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
    <div className="history">
      <div className="canceled">
        <h2 className="main-header">Canceled Orders</h2>
        <div className="history-orders">
          {orders?.map((order, i) => {
            if (order.canceled) {
              return <HistoryItem order={order} key={i} />;
            }
          })}
        </div>
      </div>
      <div className="done">
        <h2 className="main-header">Done Orders</h2>
        <div className="history-orders">
          {orders?.map((order, i) => {
            if (order.done) {
              return <HistoryItem order={order} key={i} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default History;
