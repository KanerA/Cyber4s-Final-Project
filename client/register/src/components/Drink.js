import React, { useState } from "react";

function Drink({
  drink,
  drinkOrders,
  setDrinkOrders,
  setTotalPrice,
  totalPrice,
  itemNumber,
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
      count: itemNumber.current,
    });
    setTotalPrice(totalPrice + Number(drink.price) * Number(drinkCount));
    setDrinkOrders(orders);
    setDrinkNotes("");
    setDrinkCount(1);
    itemNumber.current++;
    console.log(itemNumber.current);
  };
  return (
    <div className="item">
      <span>
        <button
          className="count-button"
          onClick={() => setDrinkCount(drinkCount + 1)}
        >
          +
        </button>
        {drinkCount}
        <button
          className="count-button"
          onClick={() => setDrinkCount(drinkCount - 1)}
        >
          -
        </button>
      </span>
      <div className="item-info">
        <p className="item-name">{drink.name}</p>
        <p className="item-description">{drink.description}</p>
        <p className="item-price">{drink.price}</p>
      </div>
      <div className="item-assign">
        <input
          className="item-notes"
          placeholder="add notes"
          onChange={(e) => {
            setDrinkNotes(e.target.value);
          }}
        />{" "}
        <br />
        <button className="item-order" onClick={(e) => addDrink(e)}>
          order
        </button>
      </div>
    </div>
  );
}

export default Drink;
