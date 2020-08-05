import React from "react";

import "./LivewatchCardTeamHeading.css";

const LiveWatchCardTeamHeading = ({ homeTeam, awayTeam, gameMatch, teams }) => {
  return (
    <div className="liveGame">
      <div className="team1">
        {homeTeam}
        <img
          className="teamImage"
          src={`https://back-of-the-net.s3.amazonaws.com/teams/${
            teams[gameMatch.team_h].short_name
          }.svg`}
          alt={homeTeam}
        />
      </div>
      <div className="liveScore">
        {gameMatch.team_h_score} - {gameMatch.team_a_score}
      </div>

      <div className="team2">
        <img
          className="teamImage"
          src={`https://back-of-the-net.s3.amazonaws.com/teams/${
            teams[gameMatch.team_a].short_name
          }.svg`}
          alt={awayTeam}
        />
        {awayTeam}
      </div>
    </div>
  );
};

export default LiveWatchCardTeamHeading;
