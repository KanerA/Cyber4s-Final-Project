import React from "react";

function StandDetails({ restaurant, setStandDetails }) {
  return (
    <div id="stand-details">
      <button
        onClick={() => {
          setStandDetails(false);
        }}
      >
        X
      </button>
      <p>{restaurant}</p>
    </div>
  );
}

export default StandDetails;
