import React, { useEffect, useState, useContext } from "react";
import PredictionsContext from "../../context/PredictionsContext";

import "./TeamInput.css";

const style = {
  border: "1px solid #bababa",
  color: "#bababa",
  cursor: "default",
};

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
            className="scoreButton"
            name="minus"
            onClick={handleScoreChange}
            disabled={buttonDisabled}
            style={buttonDisabled ? style : null}
          >
            -
          </button>
          <input readOnly={true} type="number" value={score} />
          <button
            className="scoreButton"
            name="add"
            onClick={handleScoreChange}
            disabled={buttonDisabled}
            style={buttonDisabled ? style : null}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamInput;