import React from "react";

import star from "../../../img/star.svg";
import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({
  allUsers,
  allPredictions,
  gameMatch,
  darkMode,
}) => {
  if (allPredictions.length === 0) {
    return <div />;
  } else {
    return allPredictions.map((prediction) => (
      <div key={prediction.userId} className="player">
        <div className={darkMode ? "playerName dark" : "playerName"}>
          {/* If prediction matches live score, show star image */}
          {gameMatch.team_h_score === prediction.homeTeamScore &&
          gameMatch.team_a_score === prediction.awayTeamScore &&
          gameMatch.finished ? (
            <img src={star} alt="winner" />
          ) : null}

          <div className="userName">{allUsers[prediction.userId]}</div>
        </div>
        <div
          className={
            darkMode ? "playersScorePrediction dark" : "playersScorePrediction"
          }
        >
          {prediction.homeTeamScore} - {prediction.awayTeamScore}
        </div>
        <div />
      </div>
    ));
  }
};

export default LivewatchCardUserPredictions;
