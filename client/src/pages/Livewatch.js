import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import LivewatchCard from "../components/Livewatch/LivewatchCard";
import "./Livewatch.css";

const Livewatch = () => {
  const [allPredictions, setAllPredictions] = useState({});
  const [allUsers, setAllUsers] = useState({});
  const [allMatches, setAllMatches] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthStr = localStorage.token;
    setLoading(true);
    const getGameweek = async () => {
      const { data } = await axios.get("/api/fixtures/gameweek-matches", {
        headers: { Authorization: "Bearer " + AuthStr },
      });
      const gameweek = data[0].event;
      getAllPredictions(gameweek);
    };

    const getAllPredictions = async (gameweek) => {
      const { data } = await axios.get(`/api/predictions/${gameweek}`, {
        headers: { Authorization: "Bearer " + AuthStr },
      });
      setAllPredictions(data);
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
    };

    getGameweek();
    getAllUsers();
    getAllMatches();
  }, []);

  return (
    <div className="livewatchContainer">
      {loading ? (
        <CircularProgress />
      ) : Object.keys(allPredictions).length > 0 ? (
        <>
          <h1>Live Scores</h1>
          <ul className="livewatchList">
            {Object.keys(allPredictions).map((gameId) => (
              <LivewatchCard
                key={gameId}
                gameId={gameId}
                allPredictions={allPredictions[gameId]}
                allUsers={allUsers}
                allMatches={allMatches}
              />
            ))}
          </ul>
        </>
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
