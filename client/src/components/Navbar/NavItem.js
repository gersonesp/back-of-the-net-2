import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ title, path }) => {
  const style = { opacity: "1", borderBottom: "4px solid #8879f2" };

  return (
    <li>
      <NavLink className="navLink" exact to={`/${path}`} activeStyle={style}>
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
