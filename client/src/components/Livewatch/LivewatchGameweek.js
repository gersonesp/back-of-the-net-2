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
  const [gameweekMatches, setGameweekMatches] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (index === 0) setDisplay(true);

    const filteredMatches = Object.values(allMatches).filter(
      (match) => match.event == gameweek
    );

    filteredMatches.sort(
      (a, b) => new Date(a.kickoff_time) - new Date(b.kickoff_time)
    );

    setGameweekMatches(filteredMatches);
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
          {
            // eslint-disable-next-line
            gameweekMatches.map((match) => {
              return match.event == gameweek ? (
                <LivewatchCard
                  key={match.id}
                  gameId={match.id}
                  allPredictions={allPredictions[match.id]}
                  allUsers={allUsers}
                  allMatches={allMatches}
                />
              ) : null;
            })
          }
        </div>
      )}
    </li>
  );
};

export default LivewatchGameweek;
