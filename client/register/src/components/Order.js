import axios from "axios";
import React, { useEffect, useState } from "react";

function Order({ user, restaurant }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`/orders?res_name=${restaurant}&done=false`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  });
  return <div>data.map()</div>;
}

export default Order;
