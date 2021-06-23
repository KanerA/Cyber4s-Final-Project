import React, { useState } from "react";
import axios from "axios";

function Stand({ stand, setRedirect, setRestaurant, user }) {
  const [standsCount, setStandsCount] = useState(stand.length);
  const deleteStand = async () => {
    axios.delete(`stands/remove?o=${user.uid}&n=${stand.name}`);
    setStandsCount(stand.length);
  };
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
      <p>stands count: {standsCount}</p>
    </div>
  );
}

export default Stand;
