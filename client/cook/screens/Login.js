import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function Login({
  setRestaurant,
  restaurant,
  userName,
  setUserName,
}) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [secure, setSecure] = useState(true);

  const logIntoStandOrders = async () => {
    try {
      const proxy = "http://10.0.0.13:8080";
      const body = {
        user_name: usernameRef.current,
        password: passwordRef.current,
      };
      const res = await axios.post(`${proxy}/stands/login`, body);
      console.log(body);
      try {
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
        setUserName(usernameRef.current);
        setRestaurant(res.data.name);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
    // setRestaurant("b");
  };
  return (
    <SafeAreaView>
      <Text>Login</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Stand Name"}
          onChangeText={(text) => {
            usernameRef.current = text;
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={secure}
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
        />
        <Button
          onPress={() => {
            setSecure(!secure);
          }}
          title={`${secure ? "show" : "hide"} password`}
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
