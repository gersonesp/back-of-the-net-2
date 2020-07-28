import React from "react";

import TeamInput from "./TeamInput";

import "./Match.css";

const Match = ({ awayTeam, homeTeam, id, shortNameH, shortNameA }) => {
  return (
    <li className="matchTeamContainer">
      <TeamInput name={homeTeam} id={id} shortName={shortNameH} />
      <TeamInput name={awayTeam} id={id} shortName={shortNameA} />
    </li>
  );
};

export default Match;
