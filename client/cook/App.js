import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import OrderHandler from "./screens/OrderHandler";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>test</Text>
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
