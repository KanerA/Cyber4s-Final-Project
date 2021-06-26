import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";
import CurrentOrder from "./CurrentOrder";

function Menu({ restaurant }) {
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dishOrders, setDishOrders] = useState([]);
  const [drinkOrders, setDrinkOrders] = useState([]);
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
  useEffect(() => {
    alert("added to order!");
  }, [drinkOrders, dishOrders]);

  const placeOrder = (e) => {
    axios.post(`/orders/${restaurant}`, {
      customerName: customerName.current,
      dishes: dishOrders,
      drinks: drinkOrders,
      createdAt: Date.now(),
      restaurantName: restaurant,
    });
    setCounter((prev) => prev + 1);
    setDrinkOrders([]);
    setDishOrders([]);
    e.target.parentElement.children[0].value = "";
  };

  return (
    <div>
      <div id="menu">
        <h1>my menu</h1>
        <div id="dishes">
          <h2>Dishes</h2>
          {dishes?.map((dish, i) => {
            return (
              <Dish
                dish={dish}
                key={`dish ${i}`}
                dishOrders={dishOrders}
                setDishOrders={setDishOrders}
              />
            );
          })}
        </div>
        <div id="drinks">
          <h2> Drinks</h2>
          <h3>Alcohol</h3>
          {drinks
            ?.filter((drink) => drink.alcoholic)
            .map((drink, i) => {
              return (
                <Drink
                  drink={drink}
                  key={`drink ${i}`}
                  setDrinkOrders={setDrinkOrders}
                  drinkOrders={drinkOrders}
                />
              );
            })}
          <h3>light Drinks</h3>
          {drinks
            ?.filter((drink) => !drink.alcoholic)
            .map((drink, i) => {
              return (
                <Drink
                  drink={drink}
                  key={`drink ${i}`}
                  setDrinkOrders={setDrinkOrders}
                  drinkOrders={drinkOrders}
                />
              );
            })}
        </div>
      </div>
      <div className="order">
        <h3>this order</h3>
        <CurrentOrder dishOrders={dishOrders} drinkOrders={drinkOrders} />
        <div>
          <input onChange={(e) => (customerName.current = e.target.value)} />
          <button
            id="set-order"
            onClick={(e) => {
              placeOrder(e);
            }}
          >
            set order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
