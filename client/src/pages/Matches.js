import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import MatchCard from "../components/MatchCard";
import "./Matches.css";

const Matches = ({ teams }) => {
  const [fixtures, setFixtures] = useState([]);
  const [days, setDays] = useState([]);
  const [gameweek, setGameweek] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const AuthStr = localStorage.token;
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
          !seen.hasOwnProperty(kickoff_time.slice(0, kickoff_time.indexOf("T")))
        ) {
          filteredDays.push(kickoff_time.slice(0, kickoff_time.indexOf("T")));
          seen[kickoff_time.slice(0, kickoff_time.indexOf("T"))] = true;
        }
      });
      setDays(filteredDays);

      setLoading(false);
    };

    getGameweekFixtures();
  }, []);

  return (
    <div className="matchesContainer">
      <h1>Matches</h1>
      {loading ? (
        <CircularProgress className="loading" />
      ) : (
        <>
          <p className="matchesGameweek">Gameweek {gameweek} of 38</p>
          <div className="matchesList">
            {days.map((date) => (
              <MatchCard
                key={date}
                date={date}
                fixtures={fixtures}
                teams={teams}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Matches;
