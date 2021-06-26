import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";

function Navbar({ restaurant, setRestaurant }) {
  const dispatch = useDispatch();
  return (
    <div>
      <nav>
        <span>{restaurant ? restaurant : "no restaurant"}</span>
        <Link to="/">Home Page</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/create">create menu</Link>
        <Link to="/orders">order handler</Link>
        <button onClick={() => dispatch(changeRestaurant(null))}>
          log out of stand
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
