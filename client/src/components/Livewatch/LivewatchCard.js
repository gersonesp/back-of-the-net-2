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

  useEffect(() => {
    const predictions = allPredictions[gameId][0];
    setUserId(predictions.userId);
    setHomeTeam(predictions.homeTeam);
    setHomeTeamScore(predictions.homeTeamScore);
    setAwayTeam(predictions.awayTeam);
    setAwayTeamScore(predictions.awayTeamScore);
  }, [teams]);

  return (
    <li className="livewatchCard">
      <div className="kickoffLive">
        <div className="time">{allMatches[gameId].kickoff_time}</div>
        <span className="live">{allMatches[gameId].minutes}</span>
      </div>
      <LivewatchCardTeamHeading
        gameId={gameId}
        teams={teams}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        gameMatch={allMatches[gameId]}
      />
      <LivewatchCardUserPredictions
        userName={allUsers[userId]}
        homeTeamScore={homeTeamScore}
        awayTeamScore={awayTeamScore}
      />
    </li>
  );
};

export default LivewatchCard;
