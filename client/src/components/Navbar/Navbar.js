import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

import NavItem from "./NavItem";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="heading">
        <Link to="/">
          <h1>Back of The Net</h1>
        </Link>
        <div className="navButton">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <ul>
        <NavItem title="Matches" path="" />
        <NavItem title="Live Watch" path="livewatch" />
        <NavItem title="Table" path="table" />
      </ul>
    </div>
  );
};

export default Navbar;
