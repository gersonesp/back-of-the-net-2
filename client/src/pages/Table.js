import React, { useContext } from "react";

import DarkModeContext from "../context/DarkModeContext";

import "./Table.css";

const Table = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "tableContainer dark" : "tableContainer"}>
      <div className="pageHeader">
        <h1>Table</h1>
        <p>Coming soon!</p>
      </div>
    </div>
  );
};

export default Table;
