import React, { useContext } from "react";
import DarkModeContext from "../../context/DarkModeContext";

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
  const { darkMode } = useContext(DarkModeContext);
  return (
    <li className={darkMode ? "matchTeamContainer dark" : "matchTeamContainer"}>
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
