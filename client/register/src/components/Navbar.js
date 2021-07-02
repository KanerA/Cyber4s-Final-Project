import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";
import firebase from "firebase";
import StandDetails from "./StandDetails";
import "./styles/NavBar/NavBar.css";
function Navbar({ restaurant, user }) {
  const [standDetails, setStandDetails] = useState(false);
  const dispatch = useDispatch();
  console.log(standDetails);
  return (
    <div>
      <nav>
        <span id="restaurant-name" onMouseEnter={() => setStandDetails(true)}>
          {restaurant ? restaurant : "no restaurant"}
          {standDetails && (
            <StandDetails
              restaurant={restaurant}
              setStandDetails={setStandDetails}
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
            onClick={() => dispatch(changeRestaurant(null))}
          >
            log out of stand
          </button>
          {user && (
            <button
              className="link-button"
              onClick={() => {
                dispatch(changeRestaurant(null));
                firebase.auth().signOut();
              }}
            >
              Sign out of google
            </button>
          )}
        </span>
      </nav>
    </div>
  );
}

export default Navbar;
