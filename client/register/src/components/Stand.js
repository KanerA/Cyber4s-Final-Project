import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";

function Stand({ stand, setRedirect, deleteStand }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const choseRestaurant = (name) => {
    dispatch(changeRestaurant(name));
  };
  console.log(stand);
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
      <button onClick={() => deleteStand()}> delete stand</button>
    </div>
  );
}

export default Stand;
