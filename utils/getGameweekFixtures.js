const getGameWeekFixtures = (data) => {
  const date = new Date();

  const filteredData = data.filter(({ kickoff_time, event }) =>
    kickoff_time >= date.toISOString() ? event : null
  );

  let gameweek = data[data.length - 1].event;

  if (filteredData.length > 0) {
    gameweek = [...new Set(filteredData)][0].event;
  }

  const gameweekFixtures = [];

  data.map(
    ({
      event,
      finished,
      id,
      kickoff_time,
      minutes,
      started,
      team_a,
      team_a_score,
      team_h,
      team_h_score,
    }) => {
      if (event === gameweek) {
        gameweekFixtures.push({
          event,
          finished,
          id,
          kickoff_time,
          minutes,
          started,
          team_a,
          team_a_score,
          team_h,
          team_h_score,
        });
      }
    }
  );

  return gameweekFixtures;
};

module.exports = getGameWeekFixtures;
