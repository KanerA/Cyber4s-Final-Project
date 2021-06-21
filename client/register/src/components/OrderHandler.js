import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";

function OrderHandler({ restaurant }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`/orders?res_name=${restaurant}&done=false`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
    console.log(orders);
  });
  return (
    <div>
      {orders?.map((order, i) => {
        return <Order order={order} />;
      })}
    </div>
  );
}

export default OrderHandler;
