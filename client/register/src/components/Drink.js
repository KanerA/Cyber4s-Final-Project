import React, { useState } from "react";

function Drink({
  drink,
  drinkOrders,
  setDrinkOrders,
  setTotalPrice,
  totalPrice,
}) {
  const [drinkCount, setDrinkCount] = useState(1);
  const [drinkNotes, setDrinkNotes] = useState("");
  const addDrink = (e) => {
    e.target.parentElement.children[0].value = "";
    const orders = [...drinkOrders];
    orders.push({
      name: drink.name,
      price: drink.price,
      notes: drinkNotes,
      amount: drinkCount,
    });
    console.log(typeof totalPrice, typeof drink.price, typeof drink.amount);
    setTotalPrice(totalPrice + Number(drink.price) * Number(drinkCount));
    setDrinkOrders(orders);
    setDrinkNotes("");
    setDrinkCount(1);
  };
  return (
    <div>
      <span>
        <button onClick={() => setDrinkCount(drinkCount + 1)}>+</button>
        {drinkCount}
        <button onClick={() => setDrinkCount(drinkCount - 1)}>-</button>
      </span>
      <p className="name">{drink.name}</p>
      <p className="description">{drink.description}</p>
      <p className="price">{drink.price}</p>
      <p>{drink.alcoholic ? "alcoholic" : "non-alcoholic"}</p>
      <div>
        <input
          placeholder="add notes"
          onChange={(e) => {
            setDrinkNotes(e.target.value);
          }}
        />
        <button onClick={(e) => addDrink(e)}>order</button>
      </div>
    </div>
  );
}

export default Drink;
