import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

function Drink({
  drink,
  drinkOrders,
  setDrinkOrders,
  setTotalPrice,
  totalPrice,
  itemNumber,
  deleteDrink,
}) {
  const [drinkCount, setDrinkCount] = useState(1);
  const [drinkNotes, setDrinkNotes] = useState("");
  const [checkboxPrice, setCheckboxPrice] = useState(0);
  const [checkboxes, setCheckboxes] = useState([]);
  const addDrink = (e) => {
    console.log(e.target.parentElement.children);
    e.target.parentElement.children[1].value = "";
    const orders = [...drinkOrders];
    orders.push({
      name: drink.name,
      price: drink.price,
      notes: drinkNotes,
      amount: drinkCount,
      count: itemNumber.current,
      options: checkboxes,
    });
    setTotalPrice(
      totalPrice +
        Number(drink.price) * Number(drinkCount) +
        Number(checkboxPrice) * Number(drinkCount)
    );
    setDrinkOrders(orders);
    setDrinkNotes("");
    setDrinkCount(1);
    itemNumber.current++;
    setCheckboxes([]);
    setCheckboxPrice(0);
    console.log(itemNumber.current);
  };
  return (
    <div className="item">
      <button className="delete-button" onClick={() => deleteDrink(drink)}>
        {" "}
        delete
      </button>
      <span>
        <AiOutlinePlus
          className="count-button positive"
          onClick={() => setDrinkCount(drinkCount + 1)}
        />
        {drinkCount}
        <AiOutlineMinus
          className="count-button negative"
          onClick={() => {
            if (drinkCount >= 2) setDrinkCount(drinkCount - 1);
          }}
        />
      </span>
      <div className="item-info">
        <p className="item-name">{drink.name}</p>
        <p className="item-description">{drink.description}</p>
        <p className="item-price">{drink.price}</p>
      </div>
      <div className="item-assign">
        <div className="checkboxes">
          {drink.options?.map((option) => {
            return (
              <span>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => {
                    setCheckboxPrice((prev) => prev + Number(option.price));
                    setCheckboxes((prev) => [option, ...prev]);
                    console.log(checkboxes, checkboxPrice);
                  }}
                />
                {option.name} {option.price ? option.price : ""}
              </span>
            );
          })}
        </div>
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
