import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <nav>
        <Link to="/">Home Page</Link>
        <Link to="/create">create menu</Link>
      </nav>
    </div>
  );
}

export default Navbar;
