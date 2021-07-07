import React from "react";

function StandDetails({ restaurant, setStandDetails, restaurantUser }) {
  return (
    <div id="stand-details">
      <span>stand: {restaurant}</span> <span>userName: {restaurantUser}</span>
    </div>
  );
}

export default StandDetails;
