import React from "react";

import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({ allUsers, allPredictions }) => {
  return allPredictions.map((prediction) => (
    <div key={prediction.userId} className="playersPredictions">
      <div className="player">
        <div className="playerName">{allUsers[prediction.userId]}</div>
        <div className="playersScorePrediction">
          {prediction.homeTeamScore} - {prediction.awayTeamScore}
        </div>
        <div />
      </div>
    </div>
  ));
};

export default LivewatchCardUserPredictions;
