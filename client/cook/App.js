import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import env from "./env";
import Login from "./screens/Login";
import OrderHandler from "./screens/OrderHandler";

export default function App() {
  const height = Dimensions.get("window").height;
  const [restaurant, setRestaurant] = useState();
  const [userName, setUserName] = useState();
  const scrollRef = useRef();
  const logIntoStandOrders = async (username, password) => {
    const proxy = `http://${env.IP}:${env.PORT}`;
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
      ref={scrollRef}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: height,
        backgroundColor: "#dddddd",
      }}
    >
      <View style={styles.container}>
        {/* {restaurant ? null : } */}
        {userName ? (
          <OrderHandler
            scrollRef={scrollRef}
            restaurant={restaurant}
            userName={userName}
            setUserName={setUserName}
          />
        ) : (
          <Login logIntoStandOrders={logIntoStandOrders} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
