import React from "react";

import "./TableTeamPosition.css";

const TableTeamPosition = ({
  index,
  teamId,
  teams,
  played,
  win,
  lose,
  draw,
  total,
  goalDiff,
  darkMode,
}) => {
  return (
    <li className={darkMode ? "tableTeamPosition dark" : "tableTeamPosition"}>
      <div className="position">{index + 1}</div>
      <div className="teamContent">
        <img
          className="teamImage"
          src={`https://back-of-the-net.s3.amazonaws.com/teams/${teams[teamId].short_name}.svg`}
          alt={teams[teamId].short_name}
        />
        <div className="teamName">{teams[teamId].name}</div>
      </div>
      <div className="stats">{played}</div>
      <div className="stats">{win}</div>
      <div className="stats">{draw}</div>
      <div className="stats">{lose}</div>
      <div className="stats">{goalDiff}</div>
      <div className="stats">{total}</div>
    </li>
  );
};

export default TableTeamPosition;
