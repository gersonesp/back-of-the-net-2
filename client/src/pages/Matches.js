import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";

const Matches = () => {
  const [fixtures, setFixtures] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const getGameweekFixtures = async () => {
      const { data } = await axios.get("/api/fixtures/gameweek-matches");
      setFixtures(data);

      const seen = {};
      const filteredDays = [];

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
    <div>
      <h1>Mathes</h1>
      <div>
        {days.map((date) => (
          <Card date={date} fixtures={fixtures} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
