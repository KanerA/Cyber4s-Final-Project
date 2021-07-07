import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import env from "./env";
import Login from "./screens/Login";
import OrderHandler from "./screens/OrderHandler";

export default function App() {
  const [restaurant, setRestaurant] = useState();
  const [userName, setUserName] = useState();
  console.log("username", userName);
  const logIntoStandOrders = async (username, password) => {
    const proxy = `${env.IP}:${env.PORT}`;
    const body = {
      user_name: username,
      password: password,
    };
    setUserName(body.user_name);
    try {
      const res = await axios.post(`${proxy}/stands/login`, body);
      setRestaurant(res.data.name);

      try {
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.container}>
        {restaurant ? null : <Login logIntoStandOrders={logIntoStandOrders} />}
        {userName && (
          <OrderHandler restaurant={restaurant} userName={userName} />
        )}
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
