import axios from "axios";
import React, { useRef, useState } from "react";
import "./styles/MenuCreator/MenuCreator.css";

function MenuCreator({ restaurant }) {
  const itemRef = useRef({
    name: "name",
    price: "price",
    description: "description",
    alcoholic: false,
    restaurantName: restaurant,
  });

  const [item, setItem] = useState("dish"); // default will be as UI -- dish

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
  return (
    <div className="menu-creator">
      <h1>create dish</h1>
      <div id="item-selector">
        <input
          type="radio"
          value="drink"
          name="item"
          onChange={(e) => dishOrDrink(e)}
        />
        Drink
        <input
          defaultChecked
          type="radio"
          value="dish"
          name="item"
          onChange={(e) => dishOrDrink(e)}
        />
        Dish
      </div>
      {item === "drink" && (
        <div>
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) =>
                itemRef.current.alcoholic
                  ? (itemRef.current.alcoholic = false)
                  : (itemRef.current.alcoholic = true)
              }
            />
            <span className="slider round"></span>
          </label>
          <span>Alcoholic</span>
        </div>
      )}
      <input
        id="item-name"
        className="item-property"
        placeholder={`enter ${item} name`}
        onChange={(e) => (itemRef.current.name = e.target.value)}
      />
      <input
        id="item-price"
        className="item-property"
        placeholder={`enter ${item} price`}
        onChange={(e) => (itemRef.current.price = e.target.value)}
      />
      <input
        id="item-description"
        className="item-property"
        placeholder={`enter ${item} description`}
        onChange={(e) => {
          itemRef.current.description = e.target.value;
        }}
      />

      <br></br>
      <button id="save-new-item" onClick={(e) => saveItem(e)}>
        save {item}
      </button>
    </div>
  );
}

export default MenuCreator;
