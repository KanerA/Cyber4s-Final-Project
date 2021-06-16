import axios from "axios";
import React, { useRef } from "react";

function MenuCreator() {
  const itemRef = useRef();

  const saveItem = (item) => {
    if (item.dishName && item.dishName && item.dishDescription) {
      axios.post("/dishes", {
        name: item.dishName,
        price: item.dishName,
        description: item.dishDescription,
      });
    } else if (item.drinkName && item.drinkPrice && item.drinkDescription) {
      axios.post("drinks", {
        name: item.drinkName,
        price: item.drinkPrice,
        description: item.drinkDescription,
        alcoholic: item.alcoholic,
      });
    }
  };
  return (
    <div>
      <form id="create-dish">
        <h2>create dish</h2>
        <input
          id="dish-name"
          className="dish-property"
          placeholder="enter dish name"
          onChange={(e) => (itemRef.current.dishName = e.target.value)}
        />
        <input
          id="dish-price"
          className="dish-property"
          placeholder="enter dish price"
          onChange={(e) => (itemRef.current.dishPrice = e.target.value)}
        />
        <input
          id="dish-description"
          className="dish-property"
          placeholder="enter dish description"
          onChange={(e) => (itemRef.current.dishDescription = e.target.value)}
        />
        <button id="save-new-dish" onClick={() => saveItem(itemRef.current)}>
          save dish
        </button>
      </form>
      <form id="create-drink">
        <h2>create drink</h2>
        <input
          id="drink-name"
          className="drink-property"
          placeholder="enter drink name"
          onChange={(e) => (itemRef.current.drinkName = e.target.value)}
        />
        <input
          id="drink-price"
          className="drink-property"
          placeholder="enter drink price"
          onChange={(e) => (itemRef.current.drinkPrice = e.target.value)}
        />
        <input
          id="drink-description"
          className="drink-property"
          placeholder="enter drink description"
          onChange={(e) => (itemRef.current.drinkDescription = e.target.value)}
        />
        <label class="switch">
          <input
            type="checkbox"
            onClick={(e) => (itemRef.current.alcoholic = (prev) => !prev)}
          />
          <span class="slider round"></span>
        </label>
        <button id="save-new-drink" onClick={() => saveItem(itemRef.current)}>
          save drink
        </button>
      </form>
    </div>
  );
}

export default MenuCreator;
