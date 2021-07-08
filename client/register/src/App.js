import { hot } from "react-hot-loader/root";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
  // const [refresh, setRefresh] = useState(false);

  const [login, setLogin] = useState(true);

  const refreshFunction = () => {
    const body = {
      refreshToken: localStorage.getItem("refreshToken"),
    };
    axios
      .post(`/auth/refresh`, body)
      .then((res) => {
        if (res.status === 202) {
          console.log(
            res.data.accessToken === localStorage.getItem("accessToken")
          );
          localStorage.setItem("accessToken", res.data.accessToken);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      <Router>
        <Navbar
          restaurant={restaurant}
          restaurantUser={restaurantUser}
          setLogin={setLogin}
          login={login}
        />
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
              setLogin={setLogin}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default hot(App);
