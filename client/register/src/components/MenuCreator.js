import { network } from "../utils/networkWrapper";
import React, { useRef, useState } from "react";
import { readCookie } from "../utils/cookies";
import "./styles/MenuCreator/MenuCreator.css";

function MenuCreator({ restaurant, restaurantUser, refreshFunction }) {
  const itemRef = useRef({
    name: "name",
    price: "price",
    description: "description",
    alcoholic: false,
    restaurantName: restaurantUser,
    checkbox: "",
    checkboxPrice: "",
  });
  const [checkboxes, setCheckboxes] = useState([]);
  const [item, setItem] = useState("dish");

  const saveItem = async (e) => {
    if (item === "dish") {
      const body = {
        name: itemRef.current.name,
        price: itemRef.current.price,
        description: itemRef.current.description,
        user_name: itemRef.current.restaurantName,
        options: checkboxes,
      };
      try {
        await network.post("/dishes", body, {
          headers: {
            authorization: "Bearer " + readCookie("accessToken"),
          },
        });
      } catch (err) {
        refreshFunction();
        await network.post("/dishes", body, {
          headers: {
            authorization: "Bearer " + readCookie("accessToken"),
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
        options: checkboxes,
      };
      try {
        await network.post("/drinks", body, {
          headers: {
            authorization: "Bearer " + readCookie("accessToken"),
          },
        });
      } catch (err) {
        refreshFunction();
        await network.post("/drinks", body, {
          headers: {
            authorization: "Bearer " + readCookie("accessToken"),
          },
        });
      }
    }

    e.target.parentElement.children[0].value = "";
    e.target.parentElement.children[1].value = "";
    e.target.parentElement.children[2].value = "";
    setCheckboxes([]);
  };
  const dishOrDrink = (e) => {
    setItem(e.target.value);
  };
  const addCheckbox = (e) => {
    const checkbox = {
      name: itemRef.current.checkbox,
      price: itemRef.current.checkboxPrice,
    };
    const allChex = [checkbox, ...checkboxes];
    setCheckboxes(allChex);
    itemRef.current.checkbox = "";
    itemRef.current.checkboxPrice = "";
    e.target.parentElement.children[0].value = "";
    e.target.parentElement.children[1].value = 0;
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
        <div id="checkbox">
          <input
            className="item-property checkbox"
            placeholder="checkbox name"
            onChange={(e) => (itemRef.current.checkbox = e.target.value)}
          />
          <input
            className=" item-property checkbox"
            placeholder="checkbox price"
            onChange={(e) => {
              itemRef.current.checkboxPrice = e.target.value;
            }}
            defaultValue={0}
          />
          <button onClick={(e) => addCheckbox(e)}>add</button>
          {checkboxes.length > 0 &&
            checkboxes.map((checkbox) => {
              return (
                <div>
                  <span>{checkbox.name}</span> <span>{checkbox.price}</span>
                </div>
              );
            })}
        </div>

        <button id="save-new-item" onClick={(e) => saveItem(e)}>
          save {item}
        </button>
      </div>
    </div>
  );
}

export default MenuCreator;
