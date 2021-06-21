import axios from "axios";
import React, { useRef, useState } from "react";

function MenuCreator({ restaurant }) {
  const itemRef = useRef({
    name: "name",
    price: "price",
    description: "description",
    alcoholic: false,
    restaurantName: restaurant,
  });

  const [item, setItem] = useState("");

  const saveItem = async (item) => {
    if (item === "dish") {
      await axios.post("/dishes", {
        name: itemRef.current.dishName,
        price: itemRef.current.dishName,
        description: itemRef.current.dishDescription,
        restaurantName: itemRef.current.restaurantName,
      });
    } else if (item === "drink") {
      await axios.post("drinks", {
        name: itemRef.current.drinkName,
        price: itemRef.current.drinkPrice,
        description: itemRef.current.drinkDescription,
        alcoholic: itemRef.current.alcoholic,
        restaurantName: itemRef.current.restaurantName,
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
