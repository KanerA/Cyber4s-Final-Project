import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";

function Menu(props) {
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dishOrders, SetDishOrders] = useState([{}]);
  const [drinkOrders, SetDrinkOrders] = useState([{}]);

  const customerName = useRef();

  useEffect(() => {
    axios
      .get("/dishes")
      .then((newDishes) => setDishes(newDishes))
      .catch(() => console.log("no new dishes!"));
    axios
      .get("/drinks")
      .then((newDrinks) => setDrinks(newDrinks))
      .catch(() => console.log("no new drinks!"));
  }, []);

  const placeOrder = (dishOrders, drinkOrders) => {
    axios.post("/order", {
      customerName: customerName,
      dishes: dishOrders,
      drinks: drinkOrders,
    });
  };

  return (
    <div>
      <h1>my menu</h1>
      <div id="dishes">
        {dishes.map((dish) => {
          return <Dish dish={dish} />;
        })}
      </div>
      <div id="drinks">
        {drinks.map((drink) => {
          return <Drink drink={drink} />;
        })}
      </div>
      <div className="place-order">
        <input onChange={(e) => (customerName.current = e.target.value)} />
        <button
          id="set-order"
          onClick={() => {
            placeOrder();
          }}
        >
          set order
        </button>
      </div>
    </div>
  );
}

export default Menu;
