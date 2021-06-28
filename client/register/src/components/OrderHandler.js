import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";

function OrderHandler({ restaurant }) {
  const [orders, setOrders] = useState();

  useEffect(() => {
    axios
      .get(`/orders/${restaurant}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
    // console.log(orders);
  }, []);
  return (
    <div className="orders">
      {/* helloooo */}
      {orders?.map((order, i) => {
        if (order.canceled === false) {
          return <Order order={order} key={i} />;
        } else {
          return <p id="no-orders">no orders!</p>;
        }
      })}
    </div>
  );
}

export default OrderHandler;
