import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Order from "./Order";
export default function Orders() {
  const [orders, setOrders] = useState([
    // {
    //   dish: [
    //     {
    //       name: "pita",
    //       price: 20,
    //       notes: "rewrwerew",
    //       amount: 3,
    //     },
    //   ],
    //   drink: [
    //     {
    //       name: "mango",
    //       price: 10,
    //       notes: "rew",
    //       amount: 3,
    //     },
    //   ],
    //   done: false,
    //   canceled: false,
    //   createdAt: "2021-06-27T09:53:27.805+00:00",
    //   customerName: "moshik rot",
    //   restaurantName: "b",
    // },
    // {
    //   dish: [
    //     {
    //       name: "pita",
    //       price: 20,
    //       notes: "",
    //       amount: 1,
    //     },
    //     { name: "sabih", price: 15, notes: "", amount: 1 },
    //   ],
    //   drink: [
    //     {
    //       name: "banana juice",
    //       price: 20,
    //       notes: "trtretreter",
    //       amount: 1,
    //     },
    //     {
    //       name: "banana juice",
    //       price: 10,
    //       notes: "",
    //       amount: 1,
    //     },
    //   ],
    //   done: false,
    //   canceled: false,
    //   createdAt: "2021-06-27T12:03:09.636+00:00",
    //   customerName: "rewrqwere",
    //   restaurantName: "b",
    // },
  ]);
  let restaurant = "vegan"; // to be- res_name
  useEffect(() => {
    axios
      .get(`http://10.0.0.5:8080/orders/${restaurant}`)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(orders);
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
