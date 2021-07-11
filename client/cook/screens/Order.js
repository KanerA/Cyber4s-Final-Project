import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import axios from "axios";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default function Order({ order, orderDone }) {
  const [notes, setNotes] = useState(false);
  console.log(order);
  const date = useRef(
    new Date(order.createdAt).toLocaleString("he-IL").toString()
  );
  const width = Dimensions.get("window").width;
  const backgroundColor =
    Date.now() - Date.parse(date.current) <= 7 * 60000
      ? "#03b42c"
      : Date.now() - Date.parse(date.current) <= 15 * 60000
      ? "#f5a962"
      : "#f58c91";

  console.log(Date.now() - Date.parse(date.current));
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        orderDone(order);
      }}
      onSwipeRight={() => {
        orderDone(order);
      }}
      style={[
        styles.order,
        { width: width * 0.9, backgroundColor: backgroundColor },
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
        {date.current}
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
    borderRadius: 9,
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
