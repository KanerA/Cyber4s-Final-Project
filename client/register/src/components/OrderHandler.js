import { network } from "../utils/networkWrapper";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import { socket } from "../socket";

function OrderHandler({ restaurant, restaurantUser }) {
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
        const doneNoneCanceled = res.data?.filter((order) => {
          if (!order.done && !order.canceled) return order;
        });
        setOrders(doneNoneCanceled);
      })
      .catch((err) => console.log(err));
  }, []);
  const cancelOrder = (order) => {
    alert(`${order.customerName}'s order is canceled!`);
    network
      .patch(`/orders/done/?c=true&id=${order._id}`)
      .then((res) => setCanceled(true))
      .catch((err) => console.log(err));
    const canceled = orders.filter((canceled) => canceled._id !== order._id);
    setOrders(canceled);
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
