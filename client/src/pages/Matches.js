import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import MatchCard from "../components/Matches/MatchCard";
import "./Matches.css";

const Matches = () => {
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

  if (fixtures.length === 0) {
    return (
      <p className="matchesContainer">
        There are no current fixtures, check back soon!
      </p>
    );
  } else {
    return (
      <div className="matchesContainer">
        {loading ? (
          <CircularProgress className="loading" />
        ) : (
          <>
            <p className="matchesGameweek">Gameweek {gameweek} of 38</p>
            <div className="matchesList">
              {days.map((date) => (
                <MatchCard key={date} date={date} fixtures={fixtures} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Matches;
