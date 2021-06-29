import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
} from "react-native";
// import firebase from "firebase";
import auth from "../firebaseConfig";
import axios from "axios";

export default function Login({ setRestaurant }) {
  const standNameInput = useRef();
  const passwordInput = useRef();

  const logIntoStandOrders = () => {
    // check the password and stand name input in the sql database
    // axios.get(`http://10.0.0.5:8080/stands/${standNameInput.current}`); // NEED TO CREATE ROUTE IN SERVER
    const response = "vegan"; // the axios response (standNameInput)
    setRestaurant(response);
  };
  return (
    <SafeAreaView>
      <Text>Login</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Stand Name"}
          onChangeText={(text) => (standNameInput.current = text)}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          onChangeText={(text) => (passwordInput.current = text)}
        />
      </View>
      <Button title={"Enter Orders"} onPress={logIntoStandOrders} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});
