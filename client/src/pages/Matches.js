import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";
import "./Matches.css";

const Matches = () => {
  const [fixtures, setFixtures] = useState([]);
  const [days, setDays] = useState([]);
  const [gameweek, setGameweek] = useState(1);

  useEffect(() => {
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
    };

    getGameweekFixtures();
  }, []);

  return (
    <div className="matchesContainer">
      <h1>Matches</h1>
      <p className="matchesGameweek">Gameweek {gameweek} of 38</p>
      <div className="matchesList">
        {days.map((date) => (
          <Card key={date} date={date} fixtures={fixtures} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
