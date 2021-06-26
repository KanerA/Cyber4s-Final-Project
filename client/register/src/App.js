import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebaseConfig";
import Menu from "./components/Menu";
import MenuCreator from "./components/MenuCreator";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import OrderHandler from "./components/OrderHandler";
import { useState } from "react";
import Stand from "./components/StandCreator";
import { useSelector, useDispatch } from "react-redux";
import { changeRestaurant } from "./action";

function App() {
  const restaurant = useSelector((state) => state.restaurant);
  const [user] = useAuthState(auth);
  // const [restaurant, setRestaurant] = useState();
  return (
    <div className="App">
      <Router>
        <Navbar
          restaurant={restaurant}
          // setRestaurant={setRestaurant}
        />
        <Switch>
          {restaurant && (
            <Route exact path="/create">
              <MenuCreator restaurant={restaurant} />
            </Route>
          )}
          {restaurant && (
            <Route exact path="/orders">
              <OrderHandler restaurant={restaurant} />
            </Route>
          )}
          {restaurant && (
            <Route exact path="/menu">
              <Menu restaurant={restaurant} />
            </Route>
          )}
          <Route exact path="/">
            {user ? (
              <Stand
                user={user}
                // setRestaurant={setRestaurant}
                restaurant={restaurant}
              />
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
