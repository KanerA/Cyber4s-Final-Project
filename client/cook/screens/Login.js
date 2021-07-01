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
  // const Proxy =

  const logIntoStandOrders = async () => {
    // check the password and stand name input in the sql database
    // axios.get(`http://10.0.0.5:8080/stands/${standNameInput.current}`); // NEED TO CREATE ROUTE IN SERVER
    // try {
    //   const res = await axios.post(
    //     `${Proxy}/stands/login/${username}`,
    //     {
    //       name: username.current,
    //       password: passwordRef.current,
    //     },
    //     {
    //       headers: {
    //         authorization: "Bearer " + localStorage.accessToken,
    //       },
    //     }
    //   );
    //   // if (res.status === 201) return setLoginError(true);
    //   localStorage.setItem("userId", res.data.id);
    //   localStorage.setItem("accessToken", res.data.accessToken);
    //   localStorage.setItem("refreshToken", res.data.refreshToken);
    //   document.location.pathname = "/trivia";
    // } catch (err) {
    //   console.log(err);
    //   // setLoginError(true);
    // }
    const response = "b"; // the axios response (standNameInput)
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
