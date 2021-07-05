import { hot } from "react-hot-loader/root";
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
import axios from "axios";

import "./components/styles/App/App.css";
function App() {
  const restaurant = useSelector((state) => state.restaurant);
  const restaurantUser = useSelector((state) => state.restaurantUser);
  const [refresh, setRefresh] = useState(false);

  const refreshFunction = () => {
    const body = {
      refreshToken: localStorage.getItem("refreshToken"),
    };

    axios
      .post(`/auth/refresh`, body)
      .then(({ data }) => {
        // console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };
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
                refreshFunction={refreshFunction}
              />
            </Route>
          )}
          {restaurant && (
            <Route exact path="/orders">
              <OrderHandler
                restaurant={restaurant}
                restaurantUser={restaurantUser}
                refreshFunction={refreshFunction}
              />
            </Route>
          )}
          {restaurant && (
            <Route exact path="/menu">
              <Menu
                restaurant={restaurant}
                restaurantUser={restaurantUser}
                refreshFunction={refreshFunction}
              />
            </Route>
          )}
          <Route exact path="/">
            <StandCreator
              refreshFunction={refreshFunction}
              restaurant={restaurant}
              restaurantUser={restaurantUser}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default hot(App);
