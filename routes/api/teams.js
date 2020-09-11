const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const request = require("request");

const authenticate = require("../../middlewares/authenticate");

const teamsAPI = "https://fantasy.premierleague.com/api/bootstrap-static/";

router.get("/", authenticate, async (req, res) => {
  try {
    request({ url: teamsAPI }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      const data = JSON.parse(body);
      let teams = {};

      data.teams.map(
        ({ id, code, name, short_name }) =>
          (teams[id] = { id, code, name, short_name })
      );

      return res.json(teams);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
