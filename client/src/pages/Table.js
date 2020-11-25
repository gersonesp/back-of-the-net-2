import React, { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import DarkModeContext from "../context/DarkModeContext";
import TeamsContext from "../context/TeamsContext";
import { generateTable } from "../utils/generateTable";

import TableTeamPosition from "../components/Table/TableTeamPosition";
import "./Table.css";

const Table = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { teams } = useContext(TeamsContext);
  const [table, setTable] = useState([]);

  useEffect(() => {
    try {
      const AuthStr = localStorage.token;

      const getAllMatches = async () => {
        const { data } = await axios.get("/api/fixtures/allMatches", {
          headers: { Authorization: "Bearer " + AuthStr },
        });

        const allMatches = await Object.values(data);
        const teamsArray = await Object.keys(teams);
        const updatedTable = await generateTable(allMatches, teamsArray);

        setTable(updatedTable);
      };

      getAllMatches();
    } catch (err) {
      console.error(err);
    }
  }, [teams]);

  return (
    <div className={darkMode ? "tableContainer dark" : "tableContainer"}>

      {table.length > 0 ? (
        <div className={darkMode ? "tableCard dark" : "tableCard"}>
          <ul className="tableHeader">
            <li className="positionHeader">#</li>
            <li className="clubName">Club</li>
            <li className="statsHeader">MP</li>
            <li className="statsHeader">W</li>
            <li className="statsHeader">D</li>
            <li className="statsHeader">L</li>
            <li className="statsHeader">GD</li>
            <li className="statsHeader">Pts</li>
          </ul>
          <ul>
            {table.map(
              ({ teamId, played, win, lose, draw, total, goalDiff }, index) => (
                <TableTeamPosition
                  index={index}
                  key={teamId}
                  teamId={teamId}
                  teams={teams}
                  played={played}
                  win={win}
                  lose={lose}
                  draw={draw}
                  total={total}
                  goalDiff={goalDiff}
                  darkMode={darkMode}
                />
              )
            )}
          </ul>
        </div>) : <CircularProgress />}
    </div>
  );
};

export default Table;
