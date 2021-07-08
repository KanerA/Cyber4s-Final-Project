import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
import { socket } from "../socket";

export default function OrderHandler({ restaurant, userName }) {
  const [orders, setOrders] = useState([]);

  socket.on("connect", () => {
    console.log("connected");
    socket.on("getNewOrder", (newOrder) => {
      setOrders((prev) => [...prev, newOrder]);
      // console.log(orders);
    });
  });
  useEffect(() => {
    axios
      .get(`http://${env.IP}:${env.PORT}/orders/${userName}`)
      .then((res) => {
        const ordersToDo = res.data.filter(
          (order) => !order.done && !order.canceled
        );
        setOrders(ordersToDo.reverse());
      })
      .catch((err) => console.log(err));
    // console.log(`http://${env.IP}:${env.PORT}/orders/${userName}`);
  }, []);
  const orderDone = (order) => {
    axios
      .patch(`http://${env.IP}:${env.PORT}/orders/done/?id=${order._id}&d=true`)
      .then((res) => {});

    const ordersToDo = orders.filter((invite) => invite._id !== order._id);
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
