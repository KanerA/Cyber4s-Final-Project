import React from "react";

function Drink({ drink }) {
  return (
    <div>
      <div>
        <p className="name">{drink.name}</p>
        <p className="description">{drink.description}</p>
        <p className="price">{drink.price}</p>
      </div>
    </div>
  );
}

export default Drink;
