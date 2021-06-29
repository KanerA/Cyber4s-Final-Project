import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Order({ order }) {
  const cancel = () => {
    // patch DONE
  };
  return (
    <View>
      <Text className="name"> {order.customerName}</Text>
      <View>
        {order.dish?.map((dish) => {
          return (
            <View className="dish-invites">
              <Text className="item-amount">{dish.amount}</Text>
              <Text className="item-name">{dish.name}</Text>
              <Text className="item-notes">{dish.notes}</Text>
              <Text className="total-item-price">
                {dish.amount * dish.price}
              </Text>
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
              <Text className="total-item-price">
                {drink.amount * drink.price}
              </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({});
