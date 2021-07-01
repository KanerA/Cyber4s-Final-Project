import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";
import Login from "./Login";

function Stand({ stand, setRedirect, deleteStand, loginToStand, passwordRef }) {
  const dispatch = useDispatch();
  const choseRestaurant = (name) => {
    dispatch(changeRestaurant(name));
  };

  return (
    <div>
      <p
        onClick={() => {
          choseRestaurant(stand.name);
          setRedirect(true);
        }}
      >
        {stand.name}
      </p>
      <input
        placeholder="password"
        onChange={(e) => (passwordRef.current = e.target.value)}
      />
      <button onClick={() => loginToStand(stand.userName)}>log in</button>
      <button onClick={() => deleteStand()}> delete stand</button>
    </div>
  );
}

export default Stand;
