import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "../firebaseConfig";
import axios from "axios";

export default function Login({ setRestaurant, restaurant }) {
  const standNameInput = useRef();
  const passwordInput = useRef();

  const logIntoStandOrders = async () => {
    // try {
    //   const proxy = "http://10.0.0.13:8080";
    //   const body = {
    //     user_name: standNameInput.current,
    //     password: standNameInput.current,
    //   };
    //   const res = await axios.post(`${proxy}/stands/login`, body);
    //   console.log(body);
    //   try {
    //     await AsyncStorage.setItem("userId", res.data.id);
    //     await AsyncStorage.setItem("accessToken", res.data.accessToken);
    //     await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
    //     setRestaurant(res.data.name);
    //     console.log("hello", res.data.name);
    //     console.log(restaurant);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    setRestaurant("b");
  };
  return (
    <SafeAreaView>
      <Text>Login</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Stand Name"}
          onChangeText={(text) => {
            standNameInput.current = text;
            console.log(standNameInput.current);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          onChangeText={(text) => {
            passwordInput.current = text;
            console.log(passwordInput.current);
          }}
        />
      </View>
      <Button title={"Log In"} onPress={logIntoStandOrders} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});
