const express = require("express");
const router = express.Router();
const axios = require("axios");

const authenticate = require("../../middlewares/authenticate");

const teamsAPI = "https://fantasy.premierleague.com/api/bootstrap-static/";

router.get("/", authenticate, async (req, res) => {
  try {
    const { data } = await axios.get(teamsAPI);

    let teams = {};

    data.teams.map(
      ({ id, code, name, short_name }) =>
        (teams[id] = { id, code, name, short_name })
    );

    res.send(teams);
  } catch (err) {
    console.error(err.response.data);
    res.status(500).send(err.response.data);
  }
});

module.exports = router;
