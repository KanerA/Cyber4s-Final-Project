import React, { useState } from "react";

function Dish({ dish, dishOrders, setDishOrders, setTotalPrice, totalPrice }) {
  const [dishCount, setDishCount] = useState(1);
  const [dishNotes, setDishNotes] = useState("");
  const addDish = (e) => {
    e.target.parentElement.children[0].value = "";
    const orders = [...dishOrders];
    orders.push({
      name: dish.name,
      price: dish.price,
      notes: dishNotes,
      amount: dishCount,
    });
    setTotalPrice(totalPrice + Number(dish.price) * Number(dish.amount));
    setDishOrders(orders);
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
      <div>
        <input
          placeholder="add notes"
          onChange={(e) => {
            setDishNotes(e.target.value);
          }}
        />
        <button onClick={(e) => addDish(e)}>order</button>
      </div>
    </div>
  );
}

export default Dish;
