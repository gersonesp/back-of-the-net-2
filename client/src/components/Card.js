import React from "react";

const Card = ({ date, fixtures }) => {
  return (
    <ul>
      {fixtures.map(
        ({ kickoff_time, id }) =>
          date === kickoff_time.slice(0, kickoff_time.indexOf("T")) && (
            <li>{id}</li>
          )
      )}
    </ul>
  );
};

export default Card;
