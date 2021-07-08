import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Dimensions,
} from "react-native";
const width = Dimensions.get("window").width;

export default function Login({ logIntoStandOrders }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [secure, setSecure] = useState(true);
  return (
    <SafeAreaView>
      <Text style={styles.text}>Login</Text>
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
      </View>
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
  },
  text: {
    fontSize: 35,
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
