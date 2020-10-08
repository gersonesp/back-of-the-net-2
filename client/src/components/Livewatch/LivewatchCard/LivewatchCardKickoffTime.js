import React, { useEffect, useState } from "react";
import { convertTime } from "../../../utils/convertTime";
import "./LivewatchCardKickoffTime.css";

const LivewatchCardKickoffTime = ({ darkMode, kickoffTime, finished }) => {
  const [weekday, setWeekday] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    const time = convertTime(kickoffTime);

    setWeekday(time.weekday);
    setMonth(time.month);
    setDate(time.date);
    setYear(time.year);
    setHour(time.hour);
    setMinutes(time.minutes);
    // eslint-disable-next-line
  }, [kickoffTime]);

  return (
    <div className="kickoffLive">
      <div className={darkMode ? "time dark" : "time"}>
        {`${weekday} ${month}/${date}/${year}`}
      </div>

      <div className="live">
        {finished ? (
          "FT"
        ) : new Date(kickoffTime) <= new Date() && !finished ? (
          <div>
            <div className="liveContent">
              <span className="liveDotBorder" />
              <span className="liveDot" />
              <span>Live</span>
            </div>
          </div>
        ) : (
          <div>{`${hour}:${minutes}`}</div>
        )}
      </div>
    </div>
  );
};

export default LivewatchCardKickoffTime;
