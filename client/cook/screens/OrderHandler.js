import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
export default function OrderHandler({ restaurant, userName }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`http://10.0.0.13:8080/orders/${userName}`)
      .then((res) => {
        const ordersToDo = res.data.filter((order) => !order.done);
        setOrders(ordersToDo.reverse());
      })
      .catch((err) => console.log(err));
  }, []);
  const orderDone = (order) => {
    axios
      .patch(`http://10.0.0.13:8080/orders/done/?id=${order._id}&d=true`)
      .then((res) => {});

    const ordersToDo = orders.filter(
      (invite) =>
        invite.customerName !== order.customerName &&
        invite.createdAt !== order.createdAt
    );
    setOrders(ordersToDo);
  };
  console.log("username orders", userName);
  return (
    <View>
      <Text>Orders</Text>
      {orders.map((order, i) => {
        return (
          <Order
            order={order}
            restaurant={restaurant}
            orderDone={orderDone}
            key={`order ${i}`}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
