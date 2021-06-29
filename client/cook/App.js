// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Login from "./screens/Login";
import OrderHandler from "./screens/OrderHandler";

import axios from "axios";

export default function App() {
  const [restaurant, setRestaurant] = useState();
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.container}>
        {/* <Text>test!!</Text>
        <Button title={"CLICK"} onPress={click} />
        <Text>
          {dishes?.map((dish, i) => {
            return <Text key={i}>{dish.name}</Text>;
          })}
        </Text> */}
        {restaurant ? null : <Login setRestaurant={setRestaurant} />}
        {restaurant && <OrderHandler restaurant={restaurant} />}
        {/* <StatusBar style="auto" /> */}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
