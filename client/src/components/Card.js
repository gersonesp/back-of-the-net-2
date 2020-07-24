import React, { useContext } from "react";
import TeamsContext from "../context/TeamsContext";

import Match from "./Match";

import "./Card.css";

const Card = ({ date, fixtures }) => {
  const { teams } = useContext(TeamsContext);
  return (
    <ul className="card">
      <div className="cardDate">{date}</div>
      {fixtures.map(
        ({ kickoff_time, id, team_a, team_h }) =>
          date === kickoff_time.slice(0, kickoff_time.indexOf("T")) &&
          teams[team_a] &&
          teams[team_h] && (
            <Match
              key={id}
              awayTeam={teams[team_a].name}
              homeTeam={teams[team_h].name}
            />
          )
      )}
    </ul>
  );
};

export default Card;
