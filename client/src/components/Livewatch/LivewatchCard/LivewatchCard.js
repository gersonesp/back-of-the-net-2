import React, { useEffect, useContext, useState } from "react";
import TeamsContext from "../../../context/TeamsContext";
import DarkModeContext from "../../../context/DarkModeContext";

import LivewatchCardUserPredictions from "./LivewatchCardUserPredictions";
import LivewatchCardTeamHeading from "./LivewatchCardTeamHeading";
import LivewatchCardKickoffTime from "./LivewatchCardKickoffTime";

import "./LivewatchCard.css";

const LivewatchCard = ({ gameId, allPredictions, allUsers, allMatches }) => {
  const { teams } = useContext(TeamsContext);
  const { darkMode } = useContext(DarkModeContext);
  const [kickoffTime, setKickoffTime] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setKickoffTime(allMatches[gameId].kickoff_time);
    setFinished(allMatches[gameId].finished);
    // eslint-disable-next-line
  }, [teams]);

  return (
    <div className={darkMode ? "livewatchCard dark" : "livewatchCard"}>
      <LivewatchCardKickoffTime
        darkMode={darkMode}
        kickoffTime={kickoffTime}
        finished={finished}
      />

      <LivewatchCardTeamHeading teams={teams} gameMatch={allMatches[gameId]} />

      <LivewatchCardUserPredictions
        allPredictions={allPredictions}
        allUsers={allUsers}
        gameMatch={allMatches[gameId]}
        darkMode={darkMode}
      />
    </div>
  );
};

export default LivewatchCard;
