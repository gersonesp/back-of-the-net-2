import React, { useEffect } from "react";

import star from "../../../img/star.svg";
import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({
  allUsers,
  allPredictions,
  gameMatch,
  darkMode,
  saveGameweekWinner,
}) => {
  useEffect(() => {
    saveGameweekWinner(
      allPredictions,
      gameMatch.team_h_score,
      gameMatch.team_a_score,
      gameMatch.minutes === 90
    );
    // eslint-disable-next-line
  }, []);

  if (allPredictions.length === 0) {
    return <div />;
  } else {
    return allPredictions.map((prediction, index) => (
      <div key={`${prediction.userId}-${index}`} className="player">
        <div className={darkMode ? "playerName dark" : "playerName"}>
          {/* If prediction matches live score, show star image */}
          {gameMatch.team_h_score === prediction.homeTeamScore &&
          gameMatch.team_a_score === prediction.awayTeamScore &&
          gameMatch.minutes === 90 ? (
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
