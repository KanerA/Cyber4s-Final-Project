import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import changeRestaurant from "../action/changeRestaurant";
import firebase from "firebase";
import StandDetails from "./StandDetails";
import "./styles/NavBar/NavBar.css";
import changeRestaurantUser from "../action/changeUser";
function Navbar({ restaurant, restaurantUser }) {
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
          {restaurant ? restaurant : "no restaurant"}
          {standDetails && (
            <StandDetails
              restaurant={restaurant}
              setStandDetails={setStandDetails}
              restaurantUser={restaurantUser}
            />
          )}
        </span>
        <span id="links">
          <Link className="nav-link" to="/">
            Home Page
          </Link>
          <Link className="nav-link" to="/menu">
            Menu
          </Link>
          <Link className="nav-link" to="/create">
            create menu
          </Link>
          <Link className="nav-link" to="/orders">
            order handler
          </Link>
        </span>
        <span id="buttons">
          <button
            className="link-button"
            onClick={() => {
              dispatch(changeRestaurant(null));
              dispatch(changeRestaurantUser(null));
              setStandDetails(false);
            }}
          >
            log out of stand
          </button>
        </span>
      </nav>
    </div>
  );
}

export default Navbar;
