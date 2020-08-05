import React, { useEffect, useContext, useState } from "react";
import TeamsContext from "../../context/TeamsContext";

import LivewatchCardUserPredictions from "./LivewatchCardUserPredictions";
import LivewatchCardTeamHeading from "./LivewatchCardTeamHeading";
import "./LivewatchCard.css";

const LivewatchCard = ({ gameId, allPredictions, allUsers, allMatches }) => {
  const { teams } = useContext(TeamsContext);
  const [userId, setUserId] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [homeTeamScore, setHomeTeamScore] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [awayTeamScore, setAwayTeamScore] = useState("");
  const [kickoffTime, setKickoffTime] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    const predictions = allPredictions[gameId][0];
    setUserId(predictions.userId);
    setHomeTeam(predictions.homeTeam);
    setHomeTeamScore(predictions.homeTeamScore);
    setAwayTeam(predictions.awayTeam);
    setAwayTeamScore(predictions.awayTeamScore);
    setKickoffTime(allMatches[gameId].kickoff_time);
    setMinutes(allMatches[gameId].minutes);
  }, [teams]);

  return (
    homeTeam &&
    awayTeam && (
      <li className="livewatchCard">
        <div className="kickoffLive">
          <div className="time">{kickoffTime}</div>
          <span className="live">{minutes}</span>
        </div>
        <LivewatchCardTeamHeading
          gameId={gameId}
          teams={teams}
          homeTeam={teams[homeTeam].name}
          awayTeam={teams[awayTeam].name}
          gameMatch={allMatches[gameId]}
        />
        <LivewatchCardUserPredictions
          userName={allUsers[userId]}
          homeTeamScore={homeTeamScore}
          awayTeamScore={awayTeamScore}
        />
      </li>
    )
  );
};

export default LivewatchCard;
