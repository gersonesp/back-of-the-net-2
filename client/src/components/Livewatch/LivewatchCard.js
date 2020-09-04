import React, { useEffect, useContext, useState } from "react";
import TeamsContext from "../../context/TeamsContext";
import DarkModeContext from "../../context/DarkModeContext";

import LivewatchCardUserPredictions from "./LivewatchCardUserPredictions";
import LivewatchCardTeamHeading from "./LivewatchCardTeamHeading";

import { convertTime } from "../../utils/convertTime";
import "./LivewatchCard.css";

const LivewatchCard = ({ gameId, allPredictions, allUsers, allMatches }) => {
  const { teams } = useContext(TeamsContext);
  const { darkMode } = useContext(DarkModeContext);
  const [kickoffTime, setKickoffTime] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setKickoffTime(allMatches[gameId].kickoff_time);
    setMinutes(allMatches[gameId].minutes);
    // eslint-disable-next-line
  }, [teams]);

  return (
    <li className={darkMode ? "livewatchCard dark" : "livewatchCard"}>
      <div className="kickoffLive">
        <div className={darkMode ? "time dark" : "time"}>
          {convertTime(kickoffTime)}
        </div>
        <span className="live">{`${minutes}'`}</span>
      </div>
      <LivewatchCardTeamHeading teams={teams} gameMatch={allMatches[gameId]} />
      <LivewatchCardUserPredictions
        allPredictions={allPredictions}
        allUsers={allUsers}
        gameMatch={allMatches[gameId]}
      />
    </li>
  );
};

export default LivewatchCard;
