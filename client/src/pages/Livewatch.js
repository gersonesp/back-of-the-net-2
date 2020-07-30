import React, { useEffect, useState, useContext } from "react";
import TeamsContext from "../context/TeamsContext";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import LivewatchCard from "../components/LivewatchCard";
import "./Livewatch.css";

const Livewatch = () => {
  const { teams } = useContext(TeamsContext);
  const [allPredictions, setAllPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const getAllPredictions = async () => {
        const { data } = await axios.get("/api/predictions");
        setAllPredictions(data);
        setLoading(false);
      };

      getAllPredictions();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="livewatchContainer">
      <h1>Live Scores</h1>
      {loading ? (
        <CircularProgress className="loading" />
      ) : (
        <>
          {allPredictions.map((prediction) => (
            <LivewatchCard prediction={prediction} teams={teams} />
          ))}
        </>
      )}
    </div>
  );
};

export default Livewatch;
