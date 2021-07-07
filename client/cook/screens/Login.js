import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
} from "react-native";

export default function Login({ logIntoStandOrders }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [secure, setSecure] = useState(true);

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
      <Button
        title={"Log In"}
        onPress={() =>
          logIntoStandOrders(usernameRef.current, passwordRef.current)
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});
