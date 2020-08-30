import React, { useEffect, useContext, useState } from "react";
import TeamsContext from "../../context/TeamsContext";

import LivewatchCardUserPredictions from "./LivewatchCardUserPredictions";
import LivewatchCardTeamHeading from "./LivewatchCardTeamHeading";

import { convertTime } from "../../utils/convertTime";
import "./LivewatchCard.css";

const LivewatchCard = ({ gameId, allPredictions, allUsers, allMatches }) => {
  const { teams } = useContext(TeamsContext);
  const [kickoffTime, setKickoffTime] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setKickoffTime(allMatches[gameId].kickoff_time);
    setMinutes(allMatches[gameId].minutes);
    // eslint-disable-next-line
  }, [teams]);

  return (
    <li className="livewatchCard">
      <div className="kickoffLive">
        <div className="time">{convertTime(kickoffTime)}</div>
        <span className="live">{minutes}</span>
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
