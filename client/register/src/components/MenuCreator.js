import axios from "axios";
import React, { useRef, useState } from "react";

function MenuCreator() {
  const itemRef = useRef({
    name: "name",
    price: "price",
    description: "description",
    alcoholic: false,
  });
  console.log(itemRef.current);

  const [item, setItem] = useState("");
  console.log(item);
  const saveItem = (item) => {
    if (item === "dish") {
      axios.post("/dishes", {
        name: item.dishName,
        price: item.dishName,
        description: item.dishDescription,
      });
    } else if (item === "drink") {
      axios.post("drinks", {
        name: item.drinkName,
        price: item.drinkPrice,
        description: item.drinkDescription,
        alcoholic: item.alcoholic,
      });
    }
  };
  const dishOrDrink = (e) => {
    setItem(e.target.value);
  };
  return (
    <div>
      <form id="create-dish">
        <h2>create dish</h2>
        <span>
          <input
            type="radio"
            value="drink"
            name="item"
            onChange={(e) => dishOrDrink(e)}
          />
          Drink
          <input
            type="radio"
            value="dish"
            name="item"
            onChange={(e) => dishOrDrink(e)}
          />
          Dish
        </span>
        <input
          id="dish-name"
          className="dish-property"
          placeholder="enter dish name"
          onChange={(e) => (itemRef.current.name = e.target.value)}
        />
        <input
          id="dish-price"
          className="dish-property"
          placeholder="enter dish price"
          onChange={(e) => (itemRef.current.price = e.target.value)}
        />
        <input
          id="dish-description"
          className="dish-property"
          placeholder="enter dish description"
          onChange={(e) => {
            itemRef.current.description = e.target.value;
            console.log(itemRef);
          }}
        />
        {item === "drink" && (
          <label className="switch">
            <input
              type="checkbox"
              onClick={(e) => (itemRef.current.alcoholic = (prev) => !prev)}
            />{" "}
            Alcoholic
            <span className="slider round"></span>
          </label>
        )}
        <button id="save-new-item" onClick={() => saveItem(itemRef.current)}>
          save {item}
        </button>
      </form>
    </div>
  );
}

export default MenuCreator;
