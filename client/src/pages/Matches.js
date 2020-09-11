import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import UserContext from "../context/UserContext";
import DarkModeContext from "../context/DarkModeContext";
import MatchCard from "../components/Matches/MatchCard";
import HeaderMessage from "../components/HeaderMessage";
import { setButtonStyle } from "../utils/setButtonStyle";
import "./Matches.css";

const Matches = () => {
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);
  const [fixtures, setFixtures] = useState([]);
  const [days, setDays] = useState([]);
  const [gameweek, setGameweek] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [predictions, setPredictions] = useState({});
  const [missedDeadline, setMissedDeadline] = useState(false);

  useEffect(() => {
    setLoading(true);
    const AuthStr = localStorage.token;

    try {
      const getGameweekFixtures = async () => {
        const { data } = await axios.get("/api/fixtures/gameweek-matches", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        setFixtures(data);
        setGameweek(data[0].event);

        const seen = {};
        const filteredDays = [];

        // eslint-disable-next-line
        data.map(({ kickoff_time }) => {
          if (
            !seen.hasOwnProperty(
              kickoff_time.slice(0, kickoff_time.indexOf("T"))
            )
          ) {
            filteredDays.push(kickoff_time.slice(0, kickoff_time.indexOf("T")));
            seen[kickoff_time.slice(0, kickoff_time.indexOf("T"))] = true;
          }
        });
        setDays(filteredDays);

        setLoading(false);
      };

      getGameweekFixtures();
    } catch (err) {
      console.error(err);
    }
  }, []);

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
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={darkMode ? "matchesContainer dark" : "matchesContainer"}>
      {loading ? (
        <div className="pageHeader">
          <CircularProgress className="loading" />
        </div>
      ) : fixtures.length > 0 ? (
        <>
          <div className="pageHeader">
            <p
              className={darkMode ? "matchesGameweek dark" : "matchesGameweek"}
            >
              Gameweek {gameweek} of 38
            </p>

            <HeaderMessage
              buttonDisabled={buttonDisabled}
              missedDeadLine={missedDeadline}
              darkMode={darkMode}
              firstKickOffTime={fixtures[0].kickoff_time}
            />
          </div>

          <div className="matchesList">
            <form onSubmit={handleSubmit}>
              {days.map((date) => (
                <MatchCard
                  key={date}
                  date={date}
                  fixtures={fixtures}
                  setButtonDisabled={setButtonDisabled}
                  buttonDisabled={buttonDisabled}
                  predictions={predictions}
                  setPredictions={setPredictions}
                  setMissedDeadline={setMissedDeadline}
                />
              ))}
              <button
                type="submit"
                className={setButtonStyle(
                  "submitButton",
                  darkMode,
                  buttonDisabled
                )}
                disabled={buttonDisabled}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="pageHeader">
          <p>There are no current fixtures, check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default Matches;
