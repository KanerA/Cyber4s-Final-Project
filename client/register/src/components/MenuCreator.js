import axios from "axios";
import React, { useRef, useState } from "react";
import "./styles/MenuCreator/MenuCreator.css";

function MenuCreator({ restaurant, restaurantUser, refreshFunction }) {
  const itemRef = useRef({
    name: "name",
    price: "price",
    description: "description",
    alcoholic: false,
    restaurantName: restaurantUser,
  });

  const [item, setItem] = useState("dish");

  const saveItem = async (e) => {
    if (item === "dish") {
      const body = {
        name: itemRef.current.name,
        price: itemRef.current.price,
        description: itemRef.current.description,
        user_name: itemRef.current.restaurantName,
      };
      try {
        await axios.post("/dishes", body, {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        });
      } catch (err) {
        refreshFunction();
        await axios.post("/dishes", body, {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        });
      }
    } else if (item === "drink") {
      const body = {
        name: itemRef.current.name,
        price: itemRef.current.price,
        description: itemRef.current.description,
        alcoholic: itemRef.current.alcoholic,
        user_name: itemRef.current.restaurantName,
      };
      try {
        await axios.post("/drinks", body, {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        });
      } catch (err) {
        refreshFunction();
        await axios.post("/drinks", body, {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        });
      }
    }

    e.target.parentElement.children[0].value = "";
    e.target.parentElement.children[1].value = "";
    e.target.parentElement.children[2].value = "";
  };
  const dishOrDrink = (e) => {
    setItem(e.target.value);
  };
  return (
    <div className="menu-creator">
      <h1>create dish</h1>
      <div id="item-selector">
        <input
          id="drink"
          type="radio"
          value="drink"
          name="item"
          onChange={(e) => dishOrDrink(e)}
        />
        🥛Drink
        <input
          defaultChecked
          id="dish"
          type="radio"
          value="dish"
          name="item"
          onChange={(e) => dishOrDrink(e)}
        />
        🍽️Dish
      </div>
      {item === "drink" && (
        <div id="alcoholic">
          <p id="text">🍹Alcoholic</p>
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
        </div>
      )}
      <div id="props">
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
        <br />
        <button id="save-new-item" onClick={(e) => saveItem(e)}>
          save {item}
        </button>
      </div>
    </div>
  );
}

export default MenuCreator;
