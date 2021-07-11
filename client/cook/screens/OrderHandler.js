import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import Order from "./Order";
import { socket } from "../socket";
import { _ScrollView } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function OrderHandler({ restaurant, userName }) {
  const [orders, setOrders] = useState([]);
  const [newOrder, SetNewOrders] = useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    axios
      .get(`http://${env.IP}:${env.PORT}/orders/${userName}`)
      .then((res) => {
        const ordersToDo = res.data.filter(
          (order) => !order.done && !order.canceled
        );

        setOrders(ordersToDo);
      })
      .catch((err) => console.log(err));

    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);
  socket.on("getNewOrder", (newOrder) => {
    const newOrders = [...orders, newOrder];
    SetNewOrders(true);
    setOrders(newOrders);
  });
  socket.on("getCanceledOrder", (canceledOrder) => {
    const canceled = orders.filter(
      (canceled) => canceled._id !== canceledOrder._id
    );
    setOrders(canceled);
  });
  const orderDone = (order) => {
    axios
      .patch(`http://${env.IP}:${env.PORT}/orders/done/?id=${order._id}&d=true`)
      .then((res) => {});

    const ordersToDo = orders.filter((invite) => invite._id !== order._id);
    setOrders(ordersToDo);
  };
  console.log("username orders", userName);
  return (
    <ScrollView
      scrollsToTop={true}
      contentContainerStyle={styles.scroll}
      ref={scrollRef}
      onContentSizeChange={() => {
        scrollRef.current.scrollTo({ y: 800, animated: true });
      }}
    >
      <Text style={styles.text}>
        <Text style={{ color: "white", fontSize: 40 }}>{restaurant}</Text>'s
        Orders
      </Text>
      {newOrder && (
        <Button
          onPress={() => {
            scrollRef.current.scrollToEnd();
            SetNewOrders(false);
          }}
          title="new orders"
        />
      )}
      <View style={{ marginTop: 15 }}>
        {orders ? (
          orders.map((order, i) => {
            return (
              <Order
                order={order}
                restaurant={restaurant}
                orderDone={orderDone}
                key={`order ${i}`}
              />
            );
          })
        ) : (
          <Text> No Orders!</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 5,
    backgroundColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "900",
    backgroundColor: "#356FDB",
    width: width,
    alignContent: "center",
    textAlign: "center",
    paddingVertical: 5,
    color: "black",
  },
});
