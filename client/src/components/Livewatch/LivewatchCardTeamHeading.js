import React from "react";

import "./LivewatchCardTeamHeading.css";

const LiveWatchCardTeamHeading = ({ homeTeam, awayTeam }) => {
  return (
    <div className="liveGame">
      <div className="team1">
        {homeTeam}
        <img
          className="teamImage"
          src={`https://back-of-the-net.s3.amazonaws.com/teams/${homeTeam}.svg`}
          alt=""
        />
      </div>
      <div className="liveScore">
        {0} - {0}
      </div>

      <div className="team2">
        <img
          className="teamImage"
          src={`https://back-of-the-net.s3.amazonaws.com/teams/${awayTeam}.svg`}
          alt={awayTeam}
        />
        {awayTeam}
      </div>
    </div>
  );
};

export default LiveWatchCardTeamHeading;
