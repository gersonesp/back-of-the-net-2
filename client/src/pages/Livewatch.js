import React, { useEffect, useState, useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import LivewatchGameweek from "../components/Livewatch/LivewatchGameweek";
import DarkModeContext from "../context/DarkModeContext";
import "./Livewatch.css";

const Livewatch = () => {
  const [allPredictions, setAllPredictions] = useState({});
  const [allUsers, setAllUsers] = useState({});
  const [allMatches, setAllMatches] = useState({});
  const [loading, setLoading] = useState(false);
  const [allGameWeeks, setAllGameWeeks] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const AuthStr = localStorage.token;
    setLoading(true);

    const getAllPredictions = async () => {
      const { data } = await axios.get(`/api/predictions`, {
        headers: { Authorization: "Bearer " + AuthStr },
      });
      setAllPredictions(data);

      let seen = new Set();
      const newAllGameWeeks = [];
      // eslint-disable-next-line
      Object.values(data).map((predictionObj) => {
        const gameweek = predictionObj[0].gameweek;
        if (!seen.has(gameweek)) {
          seen.add(gameweek);
          newAllGameWeeks.push(gameweek);
        }
      });

      newAllGameWeeks.reverse();
      setAllGameWeeks(newAllGameWeeks);
      setLoading(false);
    };

    const getAllUsers = async () => {
      const { data } = await axios.get("/api/users", {
        headers: { Authorization: "Bearer " + AuthStr },
      });

      setAllUsers(data);
    };

    const getAllMatches = async () => {
      const { data } = await axios.get("/api/fixtures/allMatches", {
        headers: { Authorization: "Bearer " + AuthStr },
      });

      setAllMatches(data);
      getAllPredictions();
    };

    // getGameweek();
    getAllUsers();
    getAllMatches();
  }, []);

  return (
    <div
      className={darkMode ? "livewatchContainer dark" : "livewatchContainer"}
    >
      {loading ? (
        <CircularProgress />
      ) : Object.keys(allPredictions).length > 0 ? (
        <ul className="livewatchList">
          {allGameWeeks.map((gameweek, index) => (
            <LivewatchGameweek
              key={gameweek}
              gameweek={gameweek}
              allMatches={allMatches}
              allUsers={allUsers}
              allPredictions={allPredictions}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <div className="pageHeader">
          <p>
            No predictions yet, come back after the first game of the week
            starts!
          </p>
        </div>
      )}
    </div>
  );
};

export default Livewatch;
