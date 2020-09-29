import React, { useContext, useEffect, useState } from "react";
import TeamsContext from "../../context/TeamsContext";
import PredictionsContext from "../../context/PredictionsContext";
import UserContext from "../../context/UserContext";
import DarkModeContext from "../../context/DarkModeContext";
import axios from "axios";

import Match from "./Match";
import { convertTime } from "../../utils/convertTime";
import "./MatchCard.css";

const MatchCard = ({
  date,
  fixtures,
  setButtonDisabled,
  buttonDisabled,
  predictions,
  setPredictions,
  setMissedDeadline,
}) => {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);
  const { darkMode } = useContext(DarkModeContext);
  const [weekday, setWeekday] = useState("");
  const [month, setMonth] = useState("");
  const [kickoffDate, setKickoffDate] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const time = convertTime(date);

    setWeekday(time.weekday);
    setMonth(time.month);
    setKickoffDate(time.date);
    setYear(time.year);

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
          const currentDate = new Date().getTime();
          const fixtureDate = new Date(fixtures[0].kickoff_time).getTime();
          if (currentDate >= fixtureDate) {
            console.log(currentDate, fixtureDate);
            setMissedDeadline(true);
            setButtonDisabled(true);
          }

          let initialPredictions = {};

          // eslint-disable-next-line
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

    // eslint-disable-next-line
  }, [teams]);

  return (
    <PredictionsContext.Provider value={{ predictions, setPredictions }}>
      <ul className={darkMode ? "matchCard dark" : "matchCard"}>
        <div className={darkMode ? "matchCardDate dark" : "matchCardDate"}>
          {`${weekday} ${month}/${kickoffDate}/${year}`}
        </div>
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
    </PredictionsContext.Provider>
  );
};

export default MatchCard;
