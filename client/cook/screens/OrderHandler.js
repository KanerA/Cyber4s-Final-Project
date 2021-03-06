import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Dimensions,
  Pressable,
} from "react-native";
import Order from "./Order";
import { socket } from "../socket";
import { _ScrollView } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function OrderHandler({
  restaurant,
  userName,
  setUserName,
  scrollRef,
}) {
  const [orders, setOrders] = useState([]);
  const [newOrder, SetNewOrders] = useState(false);
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
  const scroll = () => {
    scrollRef.current.scrollToEnd();
  };
  return (
    <ScrollView scrollsToTop={true} contentContainerStyle={styles.scroll}>
      <View style={styles.nav}>
        <Text style={styles.text}>
          <Text style={{ color: "white", fontSize: 40 }}>{restaurant}</Text>'s
          Orders
        </Text>
        <Pressable
          onPress={() => {
            setUserName(null);
          }}
          style={styles.button}
        >
          <Text>log out</Text>
        </Pressable>
      </View>
      {newOrder && (
        <View>
          <Pressable
            onPress={() => {
              scroll();
              SetNewOrders(false);
            }}
            style={styles.newOrders}
          >
            <Text style={{ alignSelf: "center", fontSize: 30 }}>
              new orders
              <Text>???</Text>
            </Text>
          </Pressable>
        </View>
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
    flex: 1,
    marginTop: 5,
    backgroundColor: "#dddddd",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "900",
    alignContent: "center",
    textAlign: "center",
    paddingVertical: 5,
    color: "black",
  },
  button: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 9,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#DB8A4B",
    textAlignVertical: "center",
  },
  nav: {
    position: "relative",
    top: 0,
    backgroundColor: "#356FDB",
    width: width,
  },
  newOrders: {
    width: width,
    backgroundColor: "#40C292",
    textAlign: "center",
    justifyContent: "center",
  },
});
