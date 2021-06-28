import React, { useState } from "react";

function Dish({
  dish,
  dishOrders,
  setDishOrders,
  setTotalPrice,
  totalPrice,
  itemNumber,
}) {
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
      count: itemNumber.current,
    });
    setTotalPrice(totalPrice + Number(dish.price) * Number(dishCount));
    setDishOrders(orders);
    setDishNotes("");
    setDishCount(1);
    itemNumber.current++;
    console.log(itemNumber.current);
  };
  return (
    <div className="item">
      <span>
        <button
          className="count-button"
          onClick={() => setDishCount(dishCount + 1)}
        >
          +
        </button>
        {dishCount}
        <button
          className="count-button"
          onClick={() => setDishCount(dishCount - 1)}
        >
          -
        </button>
      </span>
      <div className="item-info">
        <p className="item-name">{dish.name}</p>
        <p className="item-description">{dish.description}</p>
        <p className="item-price">{dish.price}</p>
      </div>
      <div className="item-assign">
        <input
          className="item-notes"
          placeholder="add notes"
          onChange={(e) => {
            setDishNotes(e.target.value);
          }}
        />{" "}
        <br />
        <button className="item-order" onClick={(e) => addDish(e)}>
          order
        </button>
      </div>
    </div>
  );
}

export default Dish;
