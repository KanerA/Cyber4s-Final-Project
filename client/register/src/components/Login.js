import React from "react";

import firebase from "firebase";

function Login() {
  const signUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
  };
  return (
    <div>
      <button
        onClick={() => {
          signUpWithGoogle();
        }}
      >
        sign up with google
      </button>
    </div>
  );
}

export default Login;
