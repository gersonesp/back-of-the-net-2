import React from "react";

const TeamInput = ({ name }) => {
  return (
    <div id="homeTeam">
      <div className="label-image">
        <img className="teamImage" src="" alt="" />
        <label>
          <div className="teamName">{name}</div>
        </label>
      </div>

      <div>
        <div>
          <button className="scoreButton">-</button>
          <input readOnly type="number" min="0" />
          <button className="scoreButton">+</button>
        </div>
      </div>
    </div>
  );
};

export default TeamInput;
