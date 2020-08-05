import React, { useContext, useState, useEffect } from "react";
import TeamsContext from "../../context/TeamsContext";
import PredictionsContext from "../../context/PredictionsContext";
import UserContext from "../../context/UserContext";
import axios from "axios";

import Match from "./Match";
import { convertTime } from "../../utils/convertTime";
import "./MatchCard.css";

const style = {
  border: "1px solid #bababa",
  backgroundColor: "#bababa",
  cursor: "default",
};

const MatchCard = ({ date, fixtures }) => {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);
  const [predictions, setPredictions] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const populatePredictions = async () => {
      try {
        const AuthStr = localStorage.token;
        const { data } = await axios.get(
          `/api/predictions/${user.id}/${fixtures[0].event}`,
          {
            headers: { Authorization: "Bearer " + AuthStr },
          }
        );

        if (data) {
          setPredictions(data.predictions);
          setButtonDisabled(true);
        } else {
          let initialPredictions = {};

          fixtures.map(({ team_a, team_h, id }) => {
            if (teams[team_a] && teams[team_h]) {
              initialPredictions[
                `${id}-${teams[team_h].short_name}-${team_h}-h`
              ] = 0;
              initialPredictions[
                `${id}-${teams[team_a].short_name}-${team_a}-a`
              ] = 0;
            }
          });

          setPredictions(initialPredictions);
        }
      } catch (err) {
        console.error(err);
      }
    };

    populatePredictions();
  }, [teams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitPredictions();
  };

  const submitPredictions = async () => {
    try {
      const AuthStr = localStorage.token;
      await axios.post(
        "/api/predictions",
        {
          userId: user.id,
          gameweek: fixtures[0].event,
          predictions,
        },
        {
          headers: { Authorization: "Bearer " + AuthStr },
        }
      );

      setButtonDisabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PredictionsContext.Provider value={{ predictions, setPredictions }}>
      <form onSubmit={handleSubmit}>
        <ul className="matchCard">
          <div className="matchCardDate">{convertTime(date)}</div>
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
                  awayTeamId={team_a}
                  homeTeamId={team_h}
                  id={id}
                  buttonDisabled={buttonDisabled}
                />
              )
          )}
        </ul>
        <button
          type="submit"
          className="submitButton"
          disabled={buttonDisabled}
          style={buttonDisabled ? style : null}
        >
          Submit
        </button>
      </form>
    </PredictionsContext.Provider>
  );
};

export default MatchCard;
