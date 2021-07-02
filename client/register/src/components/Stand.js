import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";
import Login from "./Login";

function Stand({ stand, setRedirect, deleteStand, loginToStand, passwordRef }) {
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const chooseRestaurant = (name) => {
    dispatch(changeRestaurant(name));
  };

  return (
    <div>
      <label
        className="stand-name"
        onClick={() => {
          chooseRestaurant(stand.name);
          setRedirect(true);
        }}
      >
        {stand.name}
      </label>
      <input
        className="login-prop"
        placeholder="user name"
        onChange={(e) => (userNameRef.current = e.target.value)}
      />
      <input
        style={showPassword ? {} : { WebkitTextSecurity: "disc" }}
        className="login-prop password"
        placeholder="password"
        onChange={(e) => (passwordRef.current = e.target.value)}
      />
      <button
        className="show-password"
        onClick={(e) => {
          setShowPassword(showPassword ? false : true);
        }}
      >
        {showPassword ? "Hide" : "Show"} Password
      </button>
      <div className="stand-controls">
        <button
          className="stand-login"
          onClick={() => loginToStand(userNameRef)}
        >
          log in
        </button>
        <button
          className="stand-delete"
          onClick={() => deleteStand(userNameRef)}
        >
          delete stand
        </button>
      </div>
    </div>
  );
}

export default Stand;
