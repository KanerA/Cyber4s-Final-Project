import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";
import CurrentOrder from "./CurrentOrder";
import "./styles/Menu/Menu.css";

function Menu({ restaurant }) {
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dishOrders, setDishOrders] = useState([]);
  const [drinkOrders, setDrinkOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
  // useEffect(() => {
  //   totalPrice.current = 0;
  //   dishOrders?.forEach((dish) => {
  //     totalPrice.current += dish.price * dish.amount;
  //   });
  //   drinkOrders?.forEach((drink) => {
  //     totalPrice.current += Number(drink.price) * Number(drink.amount);
  //   });
  // }, [dishOrders, drinkOrders]);

  const placeOrder = (e) => {
    axios.post(`/orders/${restaurant}`, {
      customerName: customerName.current,
      dish: dishOrders,
      drink: drinkOrders,
      createdAt: Date.now(),
      restaurantName: restaurant,
      totalPrice: totalPrice.current,
    });

    setDrinkOrders([]);
    setDishOrders([]);
    totalPrice.current = 0;
    e.target.parentElement.children[0].value = "";
  };
  // console.log(drinkOrders, dishOrders);
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
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
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
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
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
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                />
              );
            })}
        </div>
      </div>
      <div className="order">
        <h3>this order</h3>
        <CurrentOrder dishOrders={dishOrders} drinkOrders={drinkOrders} />
        <div>
          <p>total price: {totalPrice}</p>
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
