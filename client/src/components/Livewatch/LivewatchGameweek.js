import React, { useState, useEffect, useContext } from "react";
import LivewatchCard from "./LivewatchCard";

import DarkModeContext from "../../context/DarkModeContext";
import chevron from "../../img/chevron.svg";
import "./LivewatchGameweek.css";

const LivewatchGameweek = ({
  index,
  gameweek,
  allMatches,
  allUsers,
  allPredictions,
}) => {
  const [display, setDisplay] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (index === 0) setDisplay(true);
  }, [index]);

  const toggleDisplay = () => {
    setDisplay(!display);
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
      {display && (
        <div className="livewatchCardDisplay">
          {Object.keys(allPredictions).map((gameId) =>
            // eslint-disable-next-line
            allMatches[gameId].event == gameweek ? (
              <LivewatchCard
                key={gameId}
                gameId={gameId}
                allPredictions={allPredictions[gameId]}
                allUsers={allUsers}
                allMatches={allMatches}
              />
            ) : null
          )}
        </div>
      )}
    </li>
  );
};

export default LivewatchGameweek;
