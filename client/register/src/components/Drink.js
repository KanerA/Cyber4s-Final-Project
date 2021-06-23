import React from "react";

function Drink({ drink, drinkOrders, setOrderPrice }) {
  const addToOrder = (item) => {
    drinkOrders.current.push(item);
    setOrderPrice((prev) => prev + item.price);
  };
  return (
    <div>
      <div>
        <p className="name">name: {drink.name}</p>
        <p className="description">description: {drink.description}</p>
        <p className="price">price {drink.price}</p>
        <button
          onClick={() => {
            addToOrder(drink);
          }}
        >
          Add drink
        </button>
      </div>
    </div>
  );
}

export default Drink;
