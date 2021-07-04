import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
// require("dotenv").config();
export default function OrderHandler({ restaurant }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(
        // `http://${process.env.LOCAL_IP}:${process.env.PORT}/orders/${restaurant}`
        `http://10.0.0.13:8080/orders/${restaurant}`
      )
      .then((res) => {
        const ordersToDo = res.data.filter((order) => !order.done);
        setOrders(ordersToDo);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const orderDone = (order) => {
    axios
      .patch(`http://10.0.0.13:8080/orders/done/?id=${order._id}&d=true`)
      .then((res) => {
        // console.log(res.data); // set background color of done orders to green to show it work
      });
    console.log(order);
    const ordersToDo = orders.filter(
      (invite) =>
        invite.customerName !== order.customerName &&
        invite.createdAt !== order.createdAt
    );
    setOrders(ordersToDo);
  };
  return (
    <View>
      <Text>Orders</Text>
      {orders.reverse().map((order, i) => {
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
