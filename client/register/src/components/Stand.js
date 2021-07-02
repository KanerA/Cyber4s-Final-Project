import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";
import Login from "./Login";

function Stand({ stand, setRedirect, deleteStand, loginToStand, passwordRef }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const choseRestaurant = (name) => {
    dispatch(changeRestaurant(name));
  };

  return (
    <div>
      <label
        className="stand-name"
        onClick={() => {
          choseRestaurant(stand.name);
          setRedirect(true);
        }}
      >
        {stand.name}
      </label>
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
          onClick={() => loginToStand(stand.userName)}
        >
          log in
        </button>
        <button className="stand-delete" onClick={() => deleteStand()}>
          delete stand
        </button>
      </div>
    </div>
  );
}

export default Stand;
