import React, { useEffect, useRef, useState } from "react";
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
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    if (drink.options.length >= 1) {
      const newCheck = [];
      for (let i = 0; i < drink.options.length; i++) {
        newCheck[i] = false;
      }
      setChecked(newCheck);
    }
  }, [, drinkOrders]);

  const addDrink = (e) => {
    console.log(e.target.parentElement.children[0].children);
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
    setChecked(checked.map((check) => false));
    setChecked(false);
    setDrinkOrders(orders);
    setDrinkNotes("");
    setDrinkCount(1);
    itemNumber.current++;
    setCheckboxes([]);
    setCheckboxPrice(0);
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
          {drink.options?.map((option, i) => {
            return (
              <span>
                <input
                  type="checkbox"
                  className="checkbox"
                  onClick={() => {
                    if (checked[i]) {
                      setCheckboxPrice((prev) => prev - Number(option.price));
                      const filtered = checkboxes.filter(
                        (checkbox) => checkbox.name !== option.name
                      );
                      setCheckboxes(filtered);
                      checked[i] = false;
                      setChecked(checked);
                    } else {
                      setCheckboxPrice((prev) => prev - Number(option.price));
                      setCheckboxes((prev) => [option, ...prev]);
                      checked[i] = true;
                      setChecked(checked);
                    }
                  }}
                  checked={checked[i]}
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
