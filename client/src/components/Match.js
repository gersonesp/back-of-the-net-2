import React from "react";

import TeamInput from "./TeamInput";

import "./Match.css";

const Match = ({
  awayTeam,
  homeTeam,
  id,
  shortNameH,
  shortNameA,
  buttonDisabled,
}) => {
  return (
    <li className="matchTeamContainer">
      <TeamInput
        name={homeTeam}
        id={id}
        shortName={shortNameH}
        buttonDisabled={buttonDisabled}
      />
      <TeamInput
        name={awayTeam}
        id={id}
        shortName={shortNameA}
        buttonDisabled={buttonDisabled}
      />
    </li>
  );
};

export default Match;
