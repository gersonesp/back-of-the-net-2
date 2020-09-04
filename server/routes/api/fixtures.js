const express = require("express");
const router = express.Router();
const request = require("request");

const authenticate = require("../../middlewares/authenticate");
const getGameWeekFixtures = require("../../utils/getGameweekFixtures");

const fixturesAPI = "https://fantasy.premierleague.com/api/fixtures/";

router.get("/gameweek-matches", authenticate, (req, res) => {
  try {
    request({ url: fixturesAPI }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      const data = JSON.parse(body);
      const gameweekFixtures = getGameWeekFixtures(data);

      return res.json(gameweekFixtures);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/allMatches", authenticate, async (req, res) => {
  try {
    request({ url: fixturesAPI }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      const data = JSON.parse(body);
      const gameweekFixtures = {};

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
          gameweekFixtures[id] = {
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
          };
        }
      );

      return res.json(gameweekFixtures);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
