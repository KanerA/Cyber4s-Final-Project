import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";

export default function Order({ order }) {
  const [isDone, setIsDone] = useState(order.done);
  const cancel = () => {
    axios.patch(`http://10.0.0.5:8080/orders/done/?id=${order._id}&c=true`);
  };
  const orderDone = () => {
    axios
      .patch(`http://10.0.0.5:8080/orders/done/?id=${order._id}&d=true`)
      .then((res) => {
        setIsDone("green");
        console.log(res.data); // set background color of done orders to green to show it work
      });
    console.log(order._id);
  };
  return (
    <View style={{ backgroundColor: isDone ? "green" : null }}>
      <Text className="name"> {order.customerName}</Text>
      <View>
        {order.dish?.map((dish) => {
          return (
            <View className="dish-invites">
              <Text className="item-amount">{dish.amount}</Text>
              <Text className="item-name">{dish.name}</Text>
              <Text className="item-notes">{dish.notes}</Text>
              {/* <Text className="total-item-price">
                {dish.amount * dish.price}
              </Text> */}
            </View>
          );
        })}
      </View>
      <View className="drink-invites">
        {order.drink?.map((drink) => {
          return (
            <View className="drink-invites">
              <Text className="item-amount">{drink.amount}</Text>
              <Text className="item-name">{drink.name}</Text>
              <Text className="item-notes">{drink.notes}</Text>
              {/* <Text className="total-item-price">
                {drink.amount * drink.price}
              </Text> */}
            </View>
          );
        })}
      </View>
      <Text className="order-time">
        {new Date(order.createdAt).toLocaleString("en-gb").toString()}
      </Text>
      <Text className="total-price">
        <Text>total price: {order.totalPrice}</Text>
      </Text>
      <Button className="cancel-button" title="cancel" />
      <Button
        className="cancel-button"
        title="done"
        color={"green"}
        onPress={orderDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
