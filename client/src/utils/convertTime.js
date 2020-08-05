export const convertTime = (time) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateMilliSeconds = Date.parse(time);
  const fullDate = new Date(dateMilliSeconds);
  const day = fullDate.getUTCDay();
  const date = fullDate.getUTCDate();
  // The getUTCMonth() method returns the month (from 0 to 11) for the specified date, according to universal time.
  const month = fullDate.getUTCMonth() + 1;
  const year = fullDate.getUTCFullYear();

  return `${weekdays[day]} ${month}/${date}/${year}`;
};
