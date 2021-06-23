import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";

function Menu({ restaurant }) {
  const [orderPrice, setOrderPrice] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  // const [dishOrders, SetDishOrders] = useState([]);
  // const [drinkOrders, SetDrinkOrders] = useState([]);
  const drinkOrders = useRef([]);
  const dishOrders = useRef([]);
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

  const placeOrder = () => {
    axios.post(`/orders/${restaurant}`, {
      customerName: customerName.current,
      dishes: dishOrders.current,
      drinks: drinkOrders.current,
      createdAt: Date.now(),
      //  --- rest the counter when getting out and back into the restaurant  ***NEED TO FIX***
      id: counter,
      restaurantName: restaurant,
    });
    setCounter((prev) => prev + 1);
    console.log(dishOrders.current);
    console.log(drinkOrders.current);
  };

  return (
    <div>
      <h1>my menu</h1>
      <div id="dishes">
        <h2>Dishes</h2>
        {dishes?.map((dish, i) => {
          return (
            <Dish
              dish={dish}
              key={`dish ${i}`}
              // addToOrder={addToOrder}
              dishOrders={dishOrders}
              setOrderPrice={setOrderPrice}
            />
          );
        })}
      </div>
      <div id="drinks">
        <h2>Drinks</h2>
        {drinks?.map((drink, i) => {
          return (
            <Drink
              drink={drink}
              key={`drink ${i}`}
              // addToOrder={addToOrder}
              drinkOrders={drinkOrders}
              setOrderPrice={setOrderPrice}
            />
          );
        })}
      </div>
      <div className="place-order">
        <input onChange={(e) => (customerName.current = e.target.value)} />
        <p>total pirce {orderPrice}</p>
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
