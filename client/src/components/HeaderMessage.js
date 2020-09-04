import React from "react";
import { Link } from "react-router-dom";

import deadline from "../img/deadline.svg";
import success from "../img/success.svg";
import "./HeaderMessage.css";

const HeaderMessage = ({ buttonDisabled, missedDeadLine, darkMode }) => {
  if (buttonDisabled && missedDeadLine) {
    return (
      <div
        className={
          darkMode ? "predictionsMessage dark" : "predictionsMessage error"
        }
      >
        <img src={deadline} alt="missed-deadline" />
        <div className="predictionsMessageContent">
          <div>
            You have missed the deadline for the submission of this gameweek,
            try again next week!
          </div>
          <Link to="/livewatch">View your friends' predictions</Link>
        </div>
      </div>
    );
  } else if (buttonDisabled) {
    return (
      <div
        className={darkMode ? "predictionsMessage dark" : "predictionsMessage"}
      >
        <img src={success} alt="submitted" />
        <div className="predictionsMessageContent">
          <div>You have submitted this gameweek's predictions.</div>

          <Link to="/livewatch">Go to Live Watch</Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default HeaderMessage;
