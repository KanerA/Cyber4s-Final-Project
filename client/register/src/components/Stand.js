import React from "react";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";

function Stand({ stand, setRedirect, setRestaurant, deleteStand }) {
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
      <button onClick={() => deleteStand()}> delete stand</button>
    </div>
  );
}

export default Stand;
