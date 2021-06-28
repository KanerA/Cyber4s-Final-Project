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
  const itemNumber = useRef(0);

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
    e.target.parentElement.children[1].value = "";
    setTotalPrice(0);
    itemNumber.current = 0;
  };

  return (
    <div>
      <div id="menu">
        <h1>{restaurant}'s menu</h1>
        <div id="menu-items">
          <div id="dish-container">
            <h2 className="main-header">Dishes</h2>
            <br id="breaker" />
            <div id="dishes">
              {dishes?.map((dish, i) => {
                return (
                  <Dish
                    dish={dish}
                    key={`dish ${i}`}
                    dishOrders={dishOrders}
                    setDishOrders={setDishOrders}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    itemNumber={itemNumber}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="main-header"> Drinks</h2>
            <div id="drinks">
              <div className="drinks-secondary">
                <h3 className="secondary-header">Alcohol</h3>
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
                        itemNumber={itemNumber}
                      />
                    );
                  })}
              </div>
              <div className="drinks-secondary">
                <h3 className="secondary-header">light Drinks</h3>
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
                        itemNumber={itemNumber}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {(drinkOrders.length > 0 || dishOrders.length > 0) && (
        <div className="order">
          <h3>this order</h3>
          <CurrentOrder
            dishOrders={dishOrders}
            setDishOrders={setDishOrders}
            setDrinkOrders={setDrinkOrders}
            drinkOrders={drinkOrders}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          <div>
            <p>total price: {totalPrice}</p>
            <input onChange={(e) => (customerName.current = e.target.value)} />
            <button
              id="set-order"
              placeholder="enter customer name"
              onClick={(e) => {
                placeOrder(e);
              }}
            >
              set order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
