import React from "react";

import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({
  userId,
  homeTeamScore,
  awayTeamScore,
}) => {
  return (
    <div className="playersPredictions">
      <div className="player">
        <div className="playerName">{userId}</div>
        <div className="playersScorePrediction">
          {homeTeamScore} - {awayTeamScore}
        </div>
        <div />
      </div>
    </div>
  );
};

export default LivewatchCardUserPredictions;
