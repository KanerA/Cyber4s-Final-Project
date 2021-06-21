import axios from "axios";
import React from "react";

function Stand({ stand, setRedirect, setRestaurant, openStand }) {
  const deleteStand = async () => {
    await axios.delete(`/stands/remove/${stand.owner}/${stand.name}`);
  };
  return (
    <div>
      <p
        onClick={() => {
          openStand(stand.name);
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
