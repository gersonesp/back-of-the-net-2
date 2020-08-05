import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import LivewatchCard from "../components/Livewatch/LivewatchCard";
import "./Livewatch.css";

const Livewatch = () => {
  const [allPredictions, setAllPredictions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthStr = localStorage.token;

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

    getGameweek();
  }, []);

  return (
    <div className="livewatchContainer">
      <h1>Live Scores</h1>
      {loading ? (
        <CircularProgress className="loading" />
      ) : (
        <ul>
          {Object.keys(allPredictions).map((gameId) => (
            <LivewatchCard
              key={gameId}
              gameId={gameId}
              allPredictions={allPredictions}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Livewatch;
