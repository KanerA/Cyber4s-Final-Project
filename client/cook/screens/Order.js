import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import axios from "axios";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { Pressable } from "react-native";
const width = Dimensions.get("window").width;

export default function Order({ order, orderDone }) {
  const [notes, setNotes] = useState(false);
  const [areNotes, setAreNotes] = useState(false);
  console.log(order);
  useEffect(() => {
    order.drink?.forEach((drink) => {
      (drink.notes || drink.options.length > 0) && setAreNotes(true);
    });
    order.dish?.forEach((dish) => {
      (dish.notes || dish.options.length > 0) && setAreNotes(true);
    });
  }, []);
  const date = useRef(
    new Date(order.createdAt).toLocaleString("he-IL").toString()
  );
  const backgroundColor =
    Date.now() - Date.parse(date.current) <= 2 * 60000
      ? "#40C292"
      : Date.now() - Date.parse(date.current) <= 12 * 60000
      ? "#DB990E"
      : "#DB2F00";

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  console.log(order);
  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        orderDone(order);
      }}
      onSwipeRight={() => {
        orderDone(order);
      }}
      style={[styles.order, { backgroundColor: backgroundColor }]}
      config={config}
    >
      <Text className="name" style={{ fontSize: 30, alignSelf: "center" }}>
        {order.customerName}
      </Text>

      {areNotes && (
        <Pressable
          onPress={notes ? () => setNotes(false) : () => setNotes(true)}
          style={styles.button}
        >
          <Text style={{ fontSize: 20, padding: 5 }}>
            {notes ? "hide" : "show"}
            {`\n`}notes
          </Text>
        </Pressable>
      )}

      <View>
        {order.dish?.map((dish, i) => {
          return (
            <View
              className="dish-invites"
              key={`dish ${i}`}
              style={styles.item}
            >
              <Text className="item-amount-and-name" style={styles.orderText}>
                {dish.amount}X
                <Text
                  className="item-name"
                  style={[{ fontWeight: "bold" }, styles.orderText]}
                >
                  {dish.name}
                </Text>
              </Text>
              {notes && dish.options.length > 0 && (
                <View>
                  <Text style={styles.orderText} className="item-notes">
                    {dish.notes}
                  </Text>
                  {dish.options?.map((option) => {
                    return <Text style={styles.orderText}>{option.name}</Text>;
                  })}
                </View>
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
              <Text style={styles.orderText} className="item-amount-and-name">
                {drink.amount}X
                <Text
                  className="item-name"
                  style={[{ fontWeight: "bold" }, styles.orderText]}
                >
                  {drink.name}
                </Text>
              </Text>
              {notes && drink.notes.length > 0 && (
                <View>
                  <Text style={styles.orderText} className="item-notes">
                    {drink.notes}
                  </Text>
                  {drink.options?.map((option) => {
                    return <Text style={styles.orderText}>{option.name}</Text>;
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
      <Text className="order-time" style={{ fontSize: 15 }}>
        {date.current}
      </Text>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  order: {
    width: width * 0.9,
    position: "relative",
    alignItems: "center",
    borderColor: "black",
    marginTop: 2,
    borderWidth: 2,
    borderRadius: 9,
    marginBottom: 5,
  },

  item: {
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 25,
  },
  button: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 0,
    top: 0,
    paddingVertical: 7,
    borderRadius: 9,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "dodgerblue",
    height: "99%",
    textAlignVertical: "center",
    justifyContent: "center",
  },
  orderText: {
    fontSize: 20,
  },
  orderItem: {
    fontSize: 25,
  },
});
