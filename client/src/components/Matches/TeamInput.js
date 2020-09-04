import React, { useEffect, useState, useContext } from "react";
import PredictionsContext from "../../context/PredictionsContext";
import DarkModeContext from "../../context/DarkModeContext";

import { setButtonStyle } from "../../utils/setButtonStyle";
import "./TeamInput.css";

const TeamInput = ({
  name,
  id,
  shortName,
  buttonDisabled,
  teamId,
  teamBase,
}) => {
  const [score, setScore] = useState(0);
  const { predictions, setPredictions } = useContext(PredictionsContext);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (
      predictions &&
      predictions[`${id}-${shortName}-${teamId}-${teamBase}`]
    ) {
      setScore(predictions[`${id}-${shortName}-${teamId}-${teamBase}`]);
    }

    // eslint-disable-next-line
  }, [predictions]);

  const handleScoreChange = (event) => {
    event.preventDefault();
    const name = event.target.name;

    if (name === "minus" && score === 0) return;

    switch (name) {
      case "minus":
        setScore(score - 1);
        setPredictions({
          ...predictions,
          [`${id}-${shortName}-${teamId}-${teamBase}`]: score - 1,
        });
        break;
      case "add":
        setScore(score + 1);
        setPredictions({
          ...predictions,
          [`${id}-${shortName}-${teamId}-${teamBase}`]: score + 1,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="team">
      <div className="labelImage">
        <img
          className="teamImage"
          src={`https://back-of-the-net.s3.amazonaws.com/teams/${shortName}.svg`}
          alt={shortName}
        />
        <label>
          <div className="teamName">{name}</div>
        </label>
      </div>

      <div>
        <div>
          <button
            className={setButtonStyle("scoreButton", darkMode, buttonDisabled)}
            name="minus"
            onClick={handleScoreChange}
            disabled={buttonDisabled}
          >
            -
          </button>
          <input
            className={darkMode ? "dark" : ""}
            readOnly={true}
            type="number"
            value={score}
          />
          <button
            className={setButtonStyle("scoreButton", darkMode, buttonDisabled)}
            name="add"
            onClick={handleScoreChange}
            disabled={buttonDisabled}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamInput;
