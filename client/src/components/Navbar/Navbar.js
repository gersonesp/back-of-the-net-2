import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import DarkModeContext from "../../context/DarkModeContext";

import NavItem from "./NavItem";
import moon from "../../img/moon.svg";
import sun from "../../img/sun.svg";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useContext(UserContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleLogout = () => {
    logout();
  };

  const toggleDarkMode = async () => {
    const body = document.getElementsByClassName("body")[0];
    setDarkMode(!darkMode);
    !darkMode ? (body.className += " dark") : (body.className = "body");

    try {
      const AuthStr = localStorage.token;
      await axios.put(
        "/api/users/darkMode",
        { darkMode: !darkMode },
        {
          headers: { Authorization: "Bearer " + AuthStr },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={darkMode ? "navbar dark" : "navbar"}>
      <div className="heading">
        <Link to="/">
          <h1>Back of The Net</h1>
        </Link>

        <div className="navButton">
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>

      <ul>
        <NavItem title="Matches" path="" />
        <NavItem title="Live Watch" path="livewatch" />
        <NavItem title="Table" path="table" />
      </ul>

      <div className={darkMode ? "darkModeToggle dark" : "darkModeToggle"}>
        <button onClick={toggleDarkMode}>
          <img src={!darkMode ? moon : sun} alt="dark/light mode" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
