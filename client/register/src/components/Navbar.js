import React, { useState } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import changeRestaurant from "../action/changeRestaurant";
import firebase from "firebase";
import StandDetails from "./StandDetails";
import "./styles/NavBar/NavBar.css";
import changeRestaurantUser from "../action/changeUser";
function Navbar({ restaurant, restaurantUser, login, setLogin }) {
  const [standDetails, setStandDetails] = useState(false);

  const dispatch = useDispatch();

  return (
    <div>
      <nav>
        <span
          id="restaurant-name"
          onMouseEnter={() => setStandDetails(true)}
          onMouseLeave={() => setStandDetails(false)}
        >
          {restaurant ? restaurant : "no stand"}
          {standDetails && restaurantUser && (
            <StandDetails
              restaurant={restaurant}
              setStandDetails={setStandDetails}
              restaurantUser={restaurantUser}
            />
          )}
        </span>
        <span id="links">
          {login && (
            <span>
              <Link className="nav-link" to="/">
                Log-In
              </Link>
              <span className="bullet"> • </span>
            </span>
          )}
          <Link className="nav-link" to="/menu">
            Menu
          </Link>
          <span className="bullet"> • </span>
          <Link className="nav-link" to="/create">
            Create Menu
          </Link>
          <span className="bullet"> • </span>
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
          <span className="bullet"> • </span>
          <Link className="nav-link" to="/history">
            History
          </Link>
        </span>
        <span id="buttons">
          {login || (
            <button
              className="link-button"
              onClick={() => {
                dispatch(changeRestaurant(null));
                dispatch(changeRestaurantUser(null));
                setStandDetails(false);
                setLogin(true);
              }}
            >
              Log Out
            </button>
          )}
        </span>
      </nav>
    </div>
  );
}

export default Navbar;
