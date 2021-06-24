import React, { useState } from "react";

function Dish({ dish, dishOrders, setDishOrders }) {
  const [dishCount, setDishCount] = useState(1);
  const [dishNotes, setDishNotes] = useState("");
  const addDish = (e) => {
    e.target.parentElement.children[4].value = "";
    dishOrders.push({
      name: dish.name,
      price: dish.price,
      notes: dishNotes,
      amount: dishCount,
    });
    setDishOrders(dishOrders);
    setDishNotes("");
    setDishCount(1);
  };
  return (
    <div>
      <span>
        <button onClick={() => setDishCount(dishCount + 1)}>+</button>
        {dishCount}
        <button onClick={() => setDishCount(dishCount - 1)}>-</button>
      </span>
      <p className="name">{dish.name}</p>
      <p className="description">{dish.description}</p>
      <p className="price">{dish.price}</p>

      <input
        placeholder="add notes"
        onChange={(e) => {
          setDishNotes(e.target.value);
        }}
      />
      <button onClick={(e) => addDish(e)}>order</button>
    </div>
  );
}

export default Dish;
