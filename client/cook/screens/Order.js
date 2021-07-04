import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default function Order({ order, orderDone }) {
  const [isDone, setIsDone] = useState(order.done);
  const [notes, setNotes] = useState(false);
  const date = new Date(order.createdAt).toLocaleString("en-GB").toString();

  const cancel = () => {
    axios.patch(`http://10.0.0.13:8080/orders/done/?id=${order._id}&c=true`);
  };

  return (
    <GestureRecognizer
      // style={styles.order}
      onSwipeLeft={() => console.log("left")}
      onSwipeRight={() => console.log("right")}
      style={
        Date.now() - Date.parse(date) <= 1000 * 5 * 60
          ? { backgroundColor: "green" }
          : Date.now() - Date.parse(date) <= 1000 * 10 * 60
          ? { backgroundColor: "orange" }
          : { backgroundColor: "red" }
      }
    >
      <Text className="name" style={{ fontSize: 20, alignSelf: "center" }}>
        {order.customerName}
      </Text>

      <View>
        {order.dish?.map((dish, i) => {
          return (
            <View
              className="dish-invites"
              key={`dish ${i}`}
              style={styles.item}
            >
              <Text className="item-amount-and-name">
                {dish.amount}X
                <Text className="item-name" style={{ fontWeight: "bold" }}>
                  {dish.name}
                </Text>
              </Text>
              {notes && <Text className="item-notes">{dish.notes}</Text>}
            </View>
          );
        })}
      </View>
      <View className="drink-invites">
        {order.drink?.map((drink, i) => {
          return (
            <View
              className="drink-invites"
              key={`drink ${i}`}
              style={styles.item}
            >
              <Text className="item-amount-and-name">
                {drink.amount}X
                <Text className="item-name" style={{ fontWeight: "bold" }}>
                  {drink.name}
                </Text>
              </Text>
              {notes && <Text className="item-notes">{drink.notes}</Text>}
            </View>
          );
        })}
        <Button
          onPress={notes ? () => setNotes(false) : () => setNotes(true)}
          title={`${notes ? "hide" : "show"} notes`}
        />
      </View>
      <Text className="order-time" style={{ fontSize: 15 }}>
        {date}
      </Text>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  order: {
    position: "relative",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
  },
  orderDetails: {
    position: "relative",
    fontSize: 20,
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
});
