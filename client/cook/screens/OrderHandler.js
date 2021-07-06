import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
import socketIOClient from "socket.io-client";

export default function OrderHandler({ restaurant, userName }) {
  const [orders, setOrders] = useState([]);
  const endPoint = "http://10.0.0.5:6789";
  const socket = socketIOClient(endPoint, {
    transports: ["websocket"],
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      // socket.emit("sendOrders", userName);
      socket.on("getNewOrder", (newOrder) => {
        setOrders((prev) => [...prev, newOrder]);
      });
    });
    axios
      .get(`http://10.0.0.5:8080/orders/${userName}`)
      .then((res) => {
        const ordersToDo = res.data.filter((order) => !order.done);
        setOrders(ordersToDo.reverse());
      })
      .catch((err) => console.log(err));
  }, []);
  const orderDone = (order) => {
    axios
      .patch(`http://10.0.0.5:8080/orders/done/?id=${order._id}&d=true`)
      .then((res) => {});

    const ordersToDo = orders.filter(
      (invite) =>
        invite.customerName !== order.customerName &&
        invite.createdAt !== order.createdAt,
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
