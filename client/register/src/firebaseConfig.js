import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyApStOSZb7pT5M5EghOPOXaUFkVzXWhO6o",
  authDomain: "restaurant-5b398.firebaseapp.com",
  projectId: "restaurant-5b398",
  storageBucket: "restaurant-5b398.appspot.com",
  messagingSenderId: "111411060926",
  appId: "1:111411060926:web:95b12a723cd4f708adfeef",
  measurementId: "G-YNMKNVNZ1F",
});

const auth = firebase.auth();
export default auth;
