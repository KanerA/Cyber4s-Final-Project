import React from "react";

function Dish(dish) {
  return (
    <div>
      <p className="name">{dish.name}</p>
      <p className="description">{dish.description}</p>
      <p className="price">{dish.price}</p>
    </div>
  );
}

export default Dish;
