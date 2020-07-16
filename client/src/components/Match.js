import React from "react";

import TeamInput from "./TeamInput";

import "./Match.css";

const Match = ({ awayTeam, homeTeam }) => {
  return (
    <li className="matchTeamContainer">
      <TeamInput name={homeTeam} />
      <TeamInput name={awayTeam} />
    </li>
  );
};

export default Match;
