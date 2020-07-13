import React from "react";
import Match from "./Match";

import "./Card.css";

const Card = ({ date, fixtures }) => {
  return (
    <ul className="card">
      <div className="cardDate">{date}</div>
      {fixtures.map(
        ({ kickoff_time, id, team_a, team_h }) =>
          date === kickoff_time.slice(0, kickoff_time.indexOf("T")) && (
            <Match key={id} awayTeam={team_a} homeTeam={team_h} />
          )
      )}
    </ul>
  );
};

export default Card;
