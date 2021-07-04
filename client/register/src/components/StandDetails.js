import React from "react";

function StandDetails({ restaurant, setStandDetails, restaurantUser }) {
  return (
    <div id="stand-details">
      <button
        onClick={() => {
          setStandDetails(false);
        }}
      >
        X
      </button>
      <p>stand: {restaurant}</p>
      <p>userName: {restaurantUser}</p>
    </div>
  );
}

export default StandDetails;
