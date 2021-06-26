import React from "react";
import { Link, NavLink } from "react-router-dom";
import firebase from "firebase";
import "./styles/NavBar/NavBar.css";
function Navbar({ restaurant, setRestaurant, user }) {
  return (
    <div>
      <nav>
        <span id="restaurant-name">
          {restaurant ? restaurant : "no restaurant"}
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
          <button className="link-button" onClick={() => setRestaurant()}>
            log out of stand
          </button>
          {user && (
            <button
              className="link-button"
              onClick={() => {
                setRestaurant();
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
