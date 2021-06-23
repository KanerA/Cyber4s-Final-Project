import React from "react";

function Drink({ drink }) {
  return (
    <div>
      <div>
        <p className="name">name: {drink.name}</p>
        <p className="description">description: {drink.description}</p>
        <p className="price">price {drink.price}</p>
      </div>
    </div>
  );
}

export default Drink;
