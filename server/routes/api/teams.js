const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const authenticate = require("../../middlewares/authenticate");

const teamsAPI = "https://fantasy.premierleague.com/api/bootstrap-static/";

router.get("/", authenticate, async (req, res) => {
  try {
    fetch(teamsAPI)
      .then((response) => response.json())
      .then((data) => {
        let teams = {};

        data.teams.map(
          ({ id, code, name, short_name }) =>
            (teams[id] = { id, code, name, short_name })
        );

        res.send(teams);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
