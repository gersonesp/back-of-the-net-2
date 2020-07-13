import React from "react";

import "./Card.css";

const Card = ({ date, fixtures }) => {
  return (
    <ul className="card">
      <div className="cardDate">{date}</div>
      {fixtures.map(
        ({ kickoff_time, id }) =>
          date === kickoff_time.slice(0, kickoff_time.indexOf("T")) && (
            <li key={id}>{id}</li>
          )
      )}
    </ul>
  );
};

export default Card;
