import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import axios from "axios";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default function Order({ order, orderDone }) {
  const [notes, setNotes] = useState(false);
  const date = new Date(order.createdAt).toLocaleString("en-GB").toString();

  const width = Dimensions.get("window").width;
  const dayLightSavings =
    new Date().getMonth() <= 9 || new Date().getMonth() >= 3
      ? 60 * 60 * 1000
      : 0;

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        orderDone(order);
        console.log("swipe");
      }}
      onSwipeRight={() => {
        orderDone(order);
        console.log("swipe");
      }}
      style={[
        Date.now() - Date.parse(date) + dayLightSavings <= 5 * 60000
          ? { backgroundColor: "green" }
          : Date.now() - Date.parse(date) + dayLightSavings <= 10 * 60000
          ? { backgroundColor: "orange" }
          : { backgroundColor: "red" },
        styles.order,
        { width: width },
      ]}
      config={config}
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
              {notes && dish.notes.length > 0 && (
                <Text className="item-notes">{dish.notes}</Text>
              )}
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
              {notes && drink.notes.length > 0 && (
                <Text className="item-notes">{drink.notes}</Text>
              )}
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
    marginTop: 2,
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
