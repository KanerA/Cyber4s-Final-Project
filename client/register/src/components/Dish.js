import React from "react";

function Dish({ dish, dishOrders, setOrderPrice }) {
  const addToOrder = (item) => {
    dishOrders.current.push(item);
    setOrderPrice((prev) => prev + item.price);
  };
  return (
    <div>
      <p className="name">name :{dish.name}</p>
      <p className="description">description: {dish.description}</p>
      <p className="price">price: {dish.price}</p>
      <button
        onClick={() => {
          addToOrder(dish);
        }}
      >
        Add dish
      </button>
    </div>
  );
}

export default Dish;
