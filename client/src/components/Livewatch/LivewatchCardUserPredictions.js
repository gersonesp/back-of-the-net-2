import React from "react";

import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({
  allUsers,
  allPredictions,
  gameMatch,
}) => {
  return allPredictions.map((prediction) => (
    <div key={prediction.userId} className="playersPredictions">
      <div className="player">
        <div className="playerName">
          {allUsers[prediction.userId]}
          {gameMatch.team_h_score === prediction.homeTeamScore &&
          gameMatch.team_a_score === prediction.awayTeamScore &&
          gameMatch.finished ? (
            <img
              src="https://back-of-the-net.s3.amazonaws.com/assets/stars-24px.svg"
              alt="winner"
            />
          ) : null}
        </div>
        <div className="playersScorePrediction">
          {prediction.homeTeamScore} - {prediction.awayTeamScore}
        </div>
        <div />
      </div>
    </div>
  ));
};

export default LivewatchCardUserPredictions;
