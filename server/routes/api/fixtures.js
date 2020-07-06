const express = require("express");
const router = express.Router();
const axios = require("axios");

const fixturesAPI = "https://fantasy.premierleague.com/api/fixtures/";
const teamsAPI = "https://fantasy.premierleague.com/api/bootstrap-static/";
const date = new Date();

router.get("/gameweek-matches", async (req, res) => {
  const { data } = await axios.get(fixturesAPI);

  const filteredData = data.filter(({ kickoff_time, event }) =>
    kickoff_time >= date.toISOString() ? event : null
  );

  const gameweek = [...new Set(filteredData)][0].event;

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

  res.send(gameweekFixtures);
});

module.exports = router;
