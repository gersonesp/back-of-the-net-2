import React, { useState, useContext } from "react";
import PredictionsContext from "../context/PredictionsContext";

import "./TeamInput.css";

const TeamInput = ({ name, id, shortName }) => {
  const [score, setScore] = useState(0);
  const { predictions, setPredictions } = useContext(PredictionsContext);

  const handleScoreChange = (event) => {
    event.preventDefault();
    const name = event.target.name;

    if (name === "minus" && score === 0) return;

    switch (name) {
      case "minus":
        setScore(score - 1);
        setPredictions({ ...predictions, [`${id}-${shortName}`]: score - 1 });
        break;
      case "add":
        setScore(score + 1);
        setPredictions({ ...predictions, [`${id}-${shortName}`]: score + 1 });
        break;
      default:
        break;
    }
  };

  return (
    <div className="team">
      <div className="labelImage">
        <img className="teamImage" src="" alt="" />
        <label>
          <div className="teamName">{name}</div>
        </label>
      </div>

      <div>
        <div>
          <button
            className="scoreButton"
            name="minus"
            onClick={handleScoreChange}
          >
            -
          </button>
          <input readOnly={true} type="number" value={score} />
          <button
            className="scoreButton"
            name="add"
            onClick={handleScoreChange}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamInput;
