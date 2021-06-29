import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Login from "./screens/Login";
import OrderHandler from "./screens/OrderHandler";
import axios from "axios";

export default function App() {
  const [dishes, setDishes] = useState();
  const click = () => {
    axios
      .get("http://10.0.0.5:8080/dishes/vegan")
      .then((res) => setDishes(res.data))
      .catch((e) => console.log(e.message));
    console.log(dishes);
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.container}>
        <Text>test!!</Text>
        <Button title={"CLICK"} onPress={click} />
        <Text>
          {dishes?.map((dish, i) => {
            return <Text key={i}>{dish.name}</Text>;
          })}
        </Text>
        <OrderHandler />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
