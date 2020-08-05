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
  awayTeamId,
  homeTeamId,
}) => {
  return (
    <li className="matchTeamContainer">
      <TeamInput
        name={homeTeam}
        id={id}
        shortName={shortNameH}
        buttonDisabled={buttonDisabled}
        teamId={homeTeamId}
        teamBase="h"
      />
      <TeamInput
        name={awayTeam}
        id={id}
        shortName={shortNameA}
        buttonDisabled={buttonDisabled}
        teamId={awayTeamId}
        teamBase="a"
      />
    </li>
  );
};

export default Match;
