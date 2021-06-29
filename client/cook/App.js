import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./screens/Login";
import OrderHandler from "./screens/OrderHandler";
import axios from "axios";

export default function App() {
  const [dishes, setDishes] = useState();
  const click = () => {
    axios
      .get("/dishes/vegan")
      .then((res) => setDishes(res.data))
      .catch((e) => console.log(e.message));
    console.log(dishes);
  };
  return (
    <View style={styles.container}>
      <Text>test!!</Text>
      <Button title={"CLICK"} onPress={click} />
      <Text>
        {dishes?.map((dish) => {
          return <Text>{dish.name}</Text>;
        })}
      </Text>
      <OrderHandler />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
