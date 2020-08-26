const express = require("express");
const router = express.Router();
// const axios = require("axios");
const fetch = require("node-fetch");

const authenticate = require("../../middlewares/authenticate");

const fixturesAPI = "https://fantasy.premierleague.com/api/fixtures/";
const date = new Date();

router.get("/gameweek-matches", authenticate, (req, res) => {
  try {
    fetch(fixturesAPI)
      .then((response) => response.json())
      .then((data) => {
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

        res.send(gameweekFixtures);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/allMatches", authenticate, async (req, res) => {
  try {
    // const { data } = await axios.get(fixturesAPI);
    fetch(fixturesAPI)
      .then((response) => response.json())
      .then((data) => {
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

        res.send(gameweekFixtures);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
