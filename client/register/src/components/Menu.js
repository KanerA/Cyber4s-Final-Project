import React, { useEffect, useState, useRef } from "react";
import { Prompt } from "react-router-dom";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";
import CurrentOrder from "./CurrentOrder";
import "./styles/Menu/Menu.css";

function Menu({ restaurant, restaurantUser, refreshFunction }) {
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dishOrders, setDishOrders] = useState([]);
  const [drinkOrders, setDrinkOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const customerName = useRef();
  const itemNumber = useRef(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`/dishes/${restaurantUser}`, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      })
      .then((newDishes) => {
        if (newDishes.data.expired) {
          refreshFunction();
        } else {
          newDishes.data.length > 0
            ? setDishes(newDishes.data)
            : console.log(newDishes.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/drinks/${restaurantUser}`, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      })
      .then((newDrinks) => {
        if (newDrinks.data.expired) {
          refreshFunction();
        } else {
          newDrinks.data.length > 0
            ? setDrinks(newDrinks.data)
            : console.log(newDrinks.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const placeOrder = (e) => {
    axios.post(`/orders/${restaurantUser}`, {
      customerName: customerName.current,
      dish: dishOrders,
      drink: drinkOrders,
      createdAt: Date.now(),
      username: restaurantUser,
      totalPrice: totalPrice,
    });

    setDrinkOrders([]);
    setDishOrders([]);
    e.target.parentElement.children[2].value = "";
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
            <h3 className="secondary-header">All Dishes</h3>
            <div id="dishes">
              {dishes.map((dish, i) => {
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
                {drinks &&
                  drinks
                    .filter((drink) => drink.alcoholic)
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
                <h3 className="secondary-header">Light Drinks</h3>
                {drinks &&
                  drinks
                    .filter((drink) => !drink.alcoholic)
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
          <div className="order-info">
            <h3 className="secondary-header">this order</h3>
            <p className="item-price">total price: {totalPrice}</p>
            <input
              onChange={(e) => (customerName.current = e.target.value)}
              id="order-name"
              placeholder="Enter Name"
            />
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
          <CurrentOrder
            dishOrders={dishOrders}
            setDishOrders={setDishOrders}
            setDrinkOrders={setDrinkOrders}
            drinkOrders={drinkOrders}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          <div></div>
        </div>
      )}
      <Prompt
        when={
          customerName.current === "" ||
          dishOrders.length > 0 ||
          drinkOrders > 0
        }
        message="Are you sure you want to leave?"
      />
    </div>
  );
}

export default Menu;
