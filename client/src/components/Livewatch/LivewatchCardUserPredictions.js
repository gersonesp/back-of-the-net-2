import React from "react";

import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({
  userName,
  homeTeamScore,
  awayTeamScore,
}) => {
  return (
    <div className="playersPredictions">
      <div className="player">
        <div className="playerName">{userName}</div>
        <div className="playersScorePrediction">
          {homeTeamScore} - {awayTeamScore}
        </div>
        <div />
      </div>
    </div>
  );
};

export default LivewatchCardUserPredictions;
