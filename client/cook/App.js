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
        {restaurant ? null : (
          <Login setRestaurant={setRestaurant} restaurant={restaurant} />
        )}
        {restaurant && <OrderHandler restaurant={restaurant} />}
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
