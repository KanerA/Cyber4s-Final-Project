import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import MenuCreator from "./components/MenuCreator";
import Navbar from "./components/Navbar";
import OrderHandler from "./components/OrderHandler";
import StandCreator from "./components/StandCreator";
import { useState } from "react";
import Stand from "./components/StandCreator";
import { useSelector, useDispatch } from "react-redux";
import { changeRestaurant } from "./action";

import "./components/styles/App/App.css";
function App() {
  const restaurant = useSelector((state) => state.restaurant);
  const restaurantUser = useSelector((state) => state.restaurantUser);

  return (
    <div className="App">
      <Router>
        <Navbar restaurant={restaurant} restaurantUser={restaurantUser} />
        <Switch>
          {restaurant && (
            <Route exact path="/create">
              <MenuCreator
                restaurant={restaurant}
                restaurantUser={restaurantUser}
              />
            </Route>
          )}
          {restaurant && (
            <Route exact path="/orders">
              <OrderHandler restaurant={restaurant} />
            </Route>
          )}
          {restaurant && (
            <Route exact path="/menu">
              <Menu restaurant={restaurant} restaurantUser={restaurantUser} />
            </Route>
          )}
          <Route exact path="/">
            <StandCreator />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
