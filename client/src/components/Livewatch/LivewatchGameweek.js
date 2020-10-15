import React, { useState, useEffect, useContext } from "react";
import LivewatchCard from "./LivewatchCard/LivewatchCard";

import DarkModeContext from "../../context/DarkModeContext";
import chevron from "../../img/chevron.svg";
import trophy from "../../img/trophy.svg";
import "./LivewatchGameweek.css";

const LivewatchGameweek = ({
  index,
  gameweek,
  allMatches,
  allUsers,
  allPredictions,
}) => {
  const [display, setDisplay] = useState(false);
  const [gameweekMatches, setGameweekMatches] = useState([]);
  const [gameweekWinners, setGameweekWinners] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (index === 0) setDisplay(true);

    const filteredMatches = Object.values(allMatches).filter(
      // eslint-disable-next-line
      (match) => match.event == gameweek
    );

    filteredMatches.sort(
      (a, b) => new Date(a.kickoff_time) - new Date(b.kickoff_time)
    );

    setGameweekMatches(filteredMatches);
    // eslint-disable-next-line
  }, [index]);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  let correctPredictions = {};
  const saveGameweekWinner = (predictions, homeScore, awayScore, finished) => {
    // eslint-disable-next-line
    predictions.map((prediction) => {
      const userName = allUsers[prediction.userId];
      const homePrediction = prediction.homeTeamScore;
      const awayPrediction = prediction.awayTeamScore;

      if (
        finished &&
        homePrediction === homeScore &&
        awayPrediction === awayScore
      ) {
        if (correctPredictions.hasOwnProperty(userName)) {
          const currentCount = correctPredictions[userName];
          correctPredictions[userName] = currentCount + 1;
        } else {
          correctPredictions[userName] = 1;
        }
      }
    });

    const largest = Math.max(...Object.values(correctPredictions));
    const sortedCorrectPredictions = Object.keys(correctPredictions).sort(
      (a, b) => correctPredictions[b] - correctPredictions[a]
    );

    // eslint-disable-next-line
    const winners = sortedCorrectPredictions.filter((name) => {
      if (correctPredictions[name] >= largest) return name;
    });

    setGameweekWinners(winners);
  };

  return (
    <li key={gameweek}>
      <div className="livewatchGameweek" onClick={toggleDisplay}>
        <div
          className={
            darkMode
              ? "livewatchGameweekHeader dark"
              : "livewatchGameweekHeader"
          }
        >
          <div className="livewatchGameweekHeaderContent">
            <p>Gameweek {gameweek}</p>
            <img
              className={display ? "rotate" : null}
              src={chevron}
              alt="chevron"
            />
          </div>
        </div>
      </div>

      {display &&
        gameweekMatches.length > 0 &&
        gameweekMatches[gameweekMatches.length - 1].finished && (
          <div className={darkMode ? "winnerMessage dark" : "winnerMessage"}>
            <ul className="gameweekWinners">
              <img src={trophy} alt="trophy" />
              {gameweekWinners.map((winner, index) => (
                <li key={index}>{winner}</li>
              ))}
            </ul>
          </div>
        )}

      {display && (
        <div className="livewatchCardDisplay">
          {gameweekMatches.map((match) => {
            // eslint-disable-next-line
            return match.event == gameweek ? (
              <LivewatchCard
                key={match.id}
                gameId={match.id}
                allPredictions={allPredictions[match.id]}
                allUsers={allUsers}
                allMatches={allMatches}
                saveGameweekWinner={saveGameweekWinner}
              />
            ) : null;
          })}
        </div>
      )}
    </li>
  );
};

export default LivewatchGameweek;
