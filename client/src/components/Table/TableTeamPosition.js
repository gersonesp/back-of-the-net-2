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
  goals,
}) => {
  return (
    <li className="tableTeamPosition">
      <div className="position">{index + 1}</div>
      <div className="teamName">{teams[teamId].name}</div>
      <div className="stats">{played}</div>
      <div className="stats">{win}</div>
      <div className="stats">{draw}</div>
      <div className="stats">{lose}</div>
      <div className="stats">{goals}</div>
      <div className="stats">{total}</div>
    </li>
  );
};

export default TableTeamPosition;
