import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ restaurant }) {
  return (
    <div>
      <nav>
        <span>{restaurant ? restaurant : "no restaurant"}</span>
        <Link to="/">Home Page</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/create">create menu</Link>
      </nav>
    </div>
  );
}

export default Navbar;
