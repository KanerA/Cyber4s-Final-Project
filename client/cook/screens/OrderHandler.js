import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  let restaurant = "vegan"; // to be- res_name
  useEffect(() => {
    axios
      .get(`http://10.0.0.5:8080/orders/${restaurant}`)
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(orders);
  return (
    <View>
      <Text>Orders</Text>
      {orders.map((order, i) => {
        return <Order order={order} restaurant={restaurant} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
