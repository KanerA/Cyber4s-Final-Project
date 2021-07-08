import React, { useEffect, useState, useRef } from "react";
import { Prompt } from "react-router-dom";
import axios from "axios";
import Dish from "./Dish";
import Drink from "./Drink";
import CurrentOrder from "./CurrentOrder";
import "./styles/Menu/Menu.css";
import { socket } from "../socket";
import RingLoader from "react-spinners/RingLoader";

function Menu({ restaurant, restaurantUser, refreshFunction }) {
  const [change, setChange] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dishOrders, setDishOrders] = useState([]);
  const [drinkOrders, setDrinkOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [spinner, setSpinner] = useState(false);
  // const endPoint = "http://localhost:6789";
  // const socket = socketIOClient(endPoint, {
  //   transports: ["websocket"],
  // });

  const customerName = useRef();
  const itemNumber = useRef(0);

  const fetchData = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .all([
        axios.get(`/dishes/${restaurantUser}`, {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }),
        axios.get(`/drinks/${restaurantUser}`, {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }),
      ])
      .then(
        axios.spread((...responses) => {
          const dishRes = responses[0];
          const drinkRes = responses[1];
          if (drinkRes.data.expired) {
            setTimeout(() => console.log("timeOut"), 200);
            refreshFunction();
            fetchData();
          }
          console.log(drinkRes, dishRes);

          dishRes.data.length > 0 && setDishes(dishRes.data);
          drinkRes.data.length > 0 && setDrinks(drinkRes.data);
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("added order");

      socket.emit("sendOrders", restaurantUser);
    });
  }, [change]);

  useEffect(() => {
    setSpinner(true);
    console.log("spinner true");
    socket.on("connect", () => {
      console.log("added order");
      socket.on("sendOrder", () => {
        socket.emit("sendOrders", restaurantUser);
      });
    });
    fetchData();
    setSpinner(false);
    console.log("spinner false");
  }, []);

  const placeOrder = (e) => {
    socket.on("connect", () => {
      console.log("connected");
      alert("order succeeded");
      socket.emit("sendOrders", restaurantUser);
      socket.on("receiveOrders", (newOrders) => {
        // setOrders(newOrders);
        // console.log("new orders");
      });
    });
    axios.post(`/orders/${restaurantUser}`, {
      customerName: customerName.current,
      dish: dishOrders,
      drink: drinkOrders,
      createdAt: Date.now(),
      username: restaurantUser,
      totalPrice: totalPrice,
    });
    // socket.emit("sendOrder");
    console.log("work work work work work");
    setChange((prev) => !prev);
    setDrinkOrders([]);
    setDishOrders([]);
    e.target.parentElement.children[2].value = "";
    setTotalPrice(0);
    itemNumber.current = 0;
  };

  return (
    <div id="menu">
      <div id="content">
        <h1>{restaurant}'s menu</h1>
        <div id="menu-items">
          <div id="dish-container">
            <h2 className="main-header">Dishes</h2>
            <h3 className="secondary-header">All Dishes</h3>
            <div id="dishes">
              {spinner ? (
                <RingLoader size={150} color="green" />
              ) : (
                dishes?.map((dish, i) => {
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
                })
              )}
            </div>
          </div>
          <div>
            <h2 className="main-header"> Drinks</h2>
            <div id="drinks">
              <div className="drinks-secondary">
                <h3 className="secondary-header">Alcohol</h3>
                {spinner ? (
                  <RingLoader size={150} color="green" />
                ) : (
                  drinks
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
                    })
                )}
              </div>
              <div className="drinks-secondary">
                <h3 className="secondary-header">Light Drinks</h3>
                {spinner ? (
                  <RingLoader size={150} color="green" />
                ) : (
                  drinks
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
                    })
                )}
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
    </div>
  );
}

export default Menu;
