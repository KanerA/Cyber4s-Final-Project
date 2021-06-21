import axios from "axios";
import React from "react";

function Stand({ stand, setRedirect, setRestaurant, openStand, deleteStand }) {
  return (
    <div>
      <p
        onClick={() => {
          setRestaurant(stand.name);
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
