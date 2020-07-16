const express = require("express");
const router = express.Router();
const axios = require("axios");

const teamsAPI = "https://fantasy.premierleague.com/api/bootstrap-static/";

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(teamsAPI);

    let teams = {};

    data.teams.map(
      ({ id, code, name, short_name }) =>
        (teams[id] = { id, code, name, short_name })
    );

    res.send(teams);
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
