import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import UserContext from "../context/UserContext";
import MatchCard from "../components/Matches/MatchCard";
import "./Matches.css";

const style = {
  border: "1px solid #bababa",
  backgroundColor: "#bababa",
  cursor: "not-allowed",
};

const Matches = () => {
  const { user } = useContext(UserContext);
  const [fixtures, setFixtures] = useState([]);
  const [days, setDays] = useState([]);
  const [gameweek, setGameweek] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [predictions, setPredictions] = useState({});

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
    <div className="matchesContainer">
      {loading ? (
        <CircularProgress className="loading" />
      ) : fixtures.length > 0 ? (
        <>
          <div className="pageHeader">
            <p className="matchesGameweek">Gameweek {gameweek} of 38</p>
            {buttonDisabled ? (
              <div className="predictionsMessage">
                <div>You have submitted this gameweek's predictions.</div>
                <Link to="/livewatch">Go to Live Watch</Link>
              </div>
            ) : null}
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
                />
              ))}
              <button
                type="submit"
                className="submitButton"
                disabled={buttonDisabled}
                style={buttonDisabled ? style : null}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="matchesContainer">
          <div className="pageHeader">
            <p>There are no current fixtures, check back soon!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
