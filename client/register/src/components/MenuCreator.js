import axios from "axios";
import React, { useRef, useState } from "react";

function MenuCreator({ restaurant }) {
  const dName = useRef();
  const itemRef = useRef({
    name: "name",
    price: "price",
    description: "description",
    alcoholic: false,
    restaurantName: restaurant,
  });

  const [item, setItem] = useState("");

  const saveItem = async (e) => {
    // e.preventDefault();
    if (item === "dish") {
      await axios.post("/dishes", {
        name: itemRef.current.name,
        price: itemRef.current.price,
        description: itemRef.current.description,
        restaurant_name: itemRef.current.restaurantName,
      });
    } else if (item === "drink") {
      await axios.post("/drinks", {
        name: itemRef.current.name,
        price: itemRef.current.price,
        description: itemRef.current.description,
        alcoholic: itemRef.current.alcoholic,
        restaurant_name: itemRef.current.restaurantName,
      });
    }
    e.target.parentElement.children[2].value = "";
    e.target.parentElement.children[3].value = "";
    e.target.parentElement.children[4].value = "";
  };
  const dishOrDrink = (e) => {
    setItem(e.target.value);
  };
  console.log(dName);
  return (
    <div>
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
            onChange={(e) =>
              itemRef.current.alcoholic
                ? (itemRef.current.alcoholic = false)
                : (itemRef.current.alcoholic = true)
            }
          />{" "}
          Alcoholic
          <span className="slider round"></span>
        </label>
      )}
      <button id="save-new-item" onClick={(e) => saveItem(e)}>
        save {item}
      </button>
    </div>
  );
}

export default MenuCreator;
