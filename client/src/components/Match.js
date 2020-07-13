import React from "react";

import TeamInput from "./TeamInput";

const Match = ({ awayTeam, homeTeam }) => {
  return (
    <li>
      <TeamInput name={homeTeam} />
      <TeamInput name={awayTeam} />
    </li>
  );
};

export default Match;
