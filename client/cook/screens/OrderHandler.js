import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
// require("dotenv").config();
export default function Orders() {
  const [orders, setOrders] = useState([]);
  let restaurant = "b"; // to be- res_name
  useEffect(() => {
    axios
      .get(
        // `http://${process.env.LOCAL_IP}:${process.env.PORT}/orders/${restaurant}`
        `http://10.0.0.13:8080/orders/${restaurant}`
      )
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <Text>Orders</Text>
      {orders.map((order, i) => {
        return <Order order={order} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
