import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";

function Menu({ restaurant }) {
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dishOrders, SetDishOrders] = useState([{}]);
  const [drinkOrders, SetDrinkOrders] = useState([{}]);
  const [counter, setCounter] = useState(1);

  const customerName = useRef();

  useEffect(() => {
    axios
      .get(`/dishes/${restaurant}`)
      .then((newDishes) => setDishes(newDishes.data))
      .catch(() => console.log("no new dishes!"));
    axios
      .get(`/drinks/${restaurant}`)
      .then((newDrinks) => setDrinks(newDrinks.data))
      .catch(() => console.log("no new drinks!"));
  }, []);

  const placeOrder = (dishOrders, drinkOrders) => {
    axios.post("/order", {
      customerName: customerName,
      dishes: dishOrders,
      drinks: drinkOrders,
      createdAt: Date.now(),
      id: counter,
    });
    setCounter((prev) => prev + 1);
  };

  const addToOrder = () => {
    // onclick on item div to add the order
    // POST
  };

  return (
    <div>
      <h1>my menu</h1>
      <div id="dishes">
        <h2>Dishes</h2>
        {dishes?.map((dish, i) => {
          return <Dish dish={dish} key={`dish ${i}`} addToOrder={addToOrder} />;
        })}
      </div>
      <div id="drinks">
        <h2>Drinks</h2>
        {drinks?.map((drink, i) => {
          return (
            <Drink drink={drink} key={`drink ${i}`} addToOrder={addToOrder} />
          );
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
