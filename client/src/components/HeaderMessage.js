import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { calculateTimeLeft } from "../utils/calculateTimeLeft";
import deadline from "../img/deadline.svg";
import success from "../img/success.svg";
import timer from "../img/timer.svg";
import "./HeaderMessage.css";

const HeaderMessage = ({
  buttonDisabled,
  missedDeadLine,
  darkMode,
  firstKickOffTime,
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(firstKickOffTime));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(firstKickOffTime));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

  if (buttonDisabled && missedDeadLine) {
    return (
      <div
        className={
          darkMode ? "predictionsMessage dark" : "predictionsMessage error"
        }
      >
        <div className="predictionsMessageContent">
          <img src={deadline} alt="missed-deadline" />
          <div className="messageContent">
            <p>
              You have missed the deadline for the submission of this gameweek,
              try again next week!
            </p>
            <Link to="/livewatch">View your friends' predictions</Link>
          </div>
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
          <div className="messageContent">
            <p>You have submitted this gameweek's predictions.</p>

            <Link to="/livewatch">Go to Live Watch</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          darkMode ? "predictionsMessage dark" : "predictionsMessage timer"
        }
      >
        <img src={timer} alt="timer" />
        <div className="predictionsMessageContent">
          <div className="messageContent">
            <p>
              Please make sure to submit your predictions before the first game
              of the week starts.
            </p>

            <div>{timerComponents.length ? timerComponents : null}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default HeaderMessage;
