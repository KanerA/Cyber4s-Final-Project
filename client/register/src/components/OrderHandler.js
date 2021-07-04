import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";

function OrderHandler({ restaurant, restaurantUser }) {
  const [orders, setOrders] = useState();

  useEffect(() => {
    axios
      .get(`/orders/${restaurantUser}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
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
