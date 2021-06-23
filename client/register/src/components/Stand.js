import React, { useState } from "react";
import axios from "axios";

function Stand({ stand, setRedirect, setRestaurant, deleteStand }) {
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
      <button onClick={() => deleteStand(stand.name)}> delete stand</button>
    </div>
  );
}

export default Stand;
