import React from "react";

function Dish({ dish }) {
  return (
    <div>
      <p className="name">name :{dish.name}</p>
      <p className="description">description: {dish.description}</p>
      <p className="price">price: {dish.price}</p>
    </div>
  );
}

export default Dish;
