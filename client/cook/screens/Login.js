import React, { useRef, useState } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
const width = Dimensions.get("window").width;

export default function Login({ logIntoStandOrders }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [secure, setSecure] = useState(true);
  return (
    <SafeAreaView style={{ position: "relative" }}>
      <Image
        style={styles.image}
        source={require("../assets/logo.png")}
      ></Image>
      <View
        style={{
          top: 300,
        }}
      >
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder={"Stand's username"}
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
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            title={"Log In"}
            onPress={() =>
              logIntoStandOrders(usernameRef.current, passwordRef.current)
            }
          />
          <Button
            onPress={() => {
              setSecure(!secure);
            }}
            color={"#f5a962"}
            title={`${secure ? "show" : "hide"} password`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 1,
    backgroundColor: "#125d98",
    width: width * 0.95,
    borderRadius: 2,
    fontSize: 20,
    color: "white",
  },
  text: {
    fontSize: 35,
    alignSelf: "center",
    marginBottom: 20,
    color: "#3c8dad",
  },
  image: {
    position: "absolute",
    top: 75,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    fontSize: 45,
    alignSelf: "center",
    marginBottom: 20,
    color: "#3c8dad",
  },
  buttons: {
    marginTop: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 0.3,
  },
});
