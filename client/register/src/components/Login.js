import React from "react";
import firebase from "firebase";

function Login() {
  const signUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  return (
    <div
      id="google-login"
      onClick={() => {
        signUpWithGoogle();
      }}
      alt="sign in with google"
    ></div>
  );
}

export default Login;
