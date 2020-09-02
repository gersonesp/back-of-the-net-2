import React, { useContext } from "react";
import DarkModeContext from "../../context/DarkModeContext";

import "./LivewatchCardUserPredictions.css";

const LivewatchCardUserPredictions = ({
  allUsers,
  allPredictions,
  gameMatch,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  return allPredictions.map((prediction) => (
    <div key={prediction.userId} className={"playersPredictions"}>
      <div className="player">
        <div className={darkMode ? "playerName dark" : "playerName"}>
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
        <div
          className={
            darkMode ? "playersScorePrediction dark" : "playersScorePrediction"
          }
        >
          {prediction.homeTeamScore} - {prediction.awayTeamScore}
        </div>
        <div />
      </div>
    </div>
  ));
};

export default LivewatchCardUserPredictions;
