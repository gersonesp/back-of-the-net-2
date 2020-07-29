import React, { useContext, useState, useEffect } from "react";
import TeamsContext from "../context/TeamsContext";
import PredictionsContext from "../context/PredictionsContext";
import UserContext from "../context/UserContext";
import axios from "axios";

import Match from "./Match";

import "./Card.css";

const Card = ({ date, fixtures }) => {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    const populatePredictions = () => {
      let initialPredictions = {};

      fixtures.map(({ team_a, team_h, id }) => {
        if (teams[team_a] && teams[team_h]) {
          initialPredictions[`${id}-${teams[team_h].short_name}`] = 0;
          initialPredictions[`${id}-${teams[team_a].short_name}`] = 0;
        }
      });

      setPredictions(initialPredictions);
    };

    populatePredictions();
  }, [teams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitPredictions();
  };

  const submitPredictions = async () => {
    try {
      const { data } = await axios.post("/api/predictions", {
        userId: user.id,
        gameweek: fixtures[0].event,
        predictions,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PredictionsContext.Provider value={{ predictions, setPredictions }}>
      <form onSubmit={handleSubmit}>
        <ul className="card">
          <div className="cardDate">{date}</div>
          {fixtures.map(
            ({ kickoff_time, id, team_a, team_h }) =>
              date === kickoff_time.slice(0, kickoff_time.indexOf("T")) &&
              teams[team_a] &&
              teams[team_h] && (
                <Match
                  key={id}
                  awayTeam={teams[team_a].name}
                  homeTeam={teams[team_h].name}
                  shortNameH={teams[team_h].short_name}
                  shortNameA={teams[team_a].short_name}
                  id={id}
                />
              )
          )}
        </ul>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </PredictionsContext.Provider>
  );
};

export default Card;
