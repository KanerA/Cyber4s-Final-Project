import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";

function OrderHandler({ restaurant }) {
  const [orders, setOrders] = useState();

  useEffect(() => {
    axios
      .get(`/orders/${restaurant}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
    console.log(orders);
  }, []);
  return (
    <div>
      {/* helloooo */}
      {orders?.map((order, i) => {
        return <Order order={order} />;
      })}
    </div>
  );
}

export default OrderHandler;
