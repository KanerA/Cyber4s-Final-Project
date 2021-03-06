import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

function Dish({
  dish,
  dishOrders,
  setDishOrders,
  setTotalPrice,
  totalPrice,
  itemNumber,
  deleteDish,
}) {
  const [dishCount, setDishCount] = useState(1);
  const [dishNotes, setDishNotes] = useState("");
  const [checkboxPrice, setCheckboxPrice] = useState(0);
  const [checkboxes, setCheckboxes] = useState([]);
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    if (dish.options.length >= 1) {
      const newCheck = [];
      for (let i = 0; i < dish.options.length; i++) {
        newCheck[i] = false;
      }
      setChecked(newCheck);
    }
  }, [, dishOrders]);

  const addDish = (e) => {
    e.target.parentElement.children[1].value = "";
    const orders = [...dishOrders];
    orders.push({
      name: dish.name,
      price: dish.price,
      notes: dishNotes,
      amount: dishCount,
      count: itemNumber.current,
      options: checkboxes,
    });
    setTotalPrice(
      totalPrice +
        Number(dish.price) * Number(dishCount) -
        Number(checkboxPrice) * Number(dishCount)
    );

    setChecked(checked.map((check) => false));
    setDishOrders(orders);
    setDishNotes("");
    setDishCount(1);
    itemNumber.current++;
    setCheckboxes([]);
    setCheckboxPrice(0);
  };

  return (
    <div className="item">
      <button className="delete-button" onClick={() => deleteDish(dish)}>
        delete
      </button>
      <span>
        <AiOutlinePlus
          className="count-button positive"
          onClick={() => setDishCount(dishCount + 1)}
        />
        {dishCount}
        <AiOutlineMinus
          className="count-button negative "
          onClick={() => {
            if (dishCount >= 2) setDishCount(dishCount - 1);
          }}
        />
      </span>
      <div className="item-info">
        <p className="item-name">{dish.name}</p>
        <p className="item-description">{dish.description}</p>
        <p className="item-price">{dish.price}</p>
      </div>
      <div className="item-assign">
        <div className="checkboxes">
          {dish.options?.map((option, i) => {
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
