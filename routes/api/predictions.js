require("dotenv").config();
const express = require("express");
const router = express.Router();
const request = require("request");

const Prediction = require("../../models/Prediction");
const authenticate = require("../../middlewares/authenticate");
const getGameWeekFixtures = require("../../utils/getGameweekFixtures");

const fixturesAPI = "https://fantasy.premierleague.com/api/fixtures/";

router.post("/", authenticate, (req, res) => {
  const { userId, gameweek, predictions } = req.body;
  try {
    request({ url: fixturesAPI }, async (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      const data = JSON.parse(body);
      const gameweekFixtures = getGameWeekFixtures(data);

      // Check for submission deadline

      const currentDate = new Date().getTime();
      const fixtureDate = new Date(gameweekFixtures[0].kickoff_time).getTime();
      if (currentDate >= fixtureDate) {
        return res.status(400).send({
          predictions: `You have missed the deadline for the submission of this gameweek, try again next week!`,
        });
      }

      const prediction = await Prediction.findOne({ gameweek, userId });

      if (prediction) {
        res.status(400).send({
          predictions: `You have already submitted your predictions for gameweek ${gameweek}`,
        });
      } else {
        const newPrediction = new Prediction({
          userId,
          gameweek,
          predictions,
        });
        await newPrediction.save();

        res.status(200).send({
          predictions: `Succesfully submitted predictions for gameweek ${gameweek}`,
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    let allPredictions = {};
    const predictions = await Prediction.find();

    predictions.map((predictionsObject) => {
      for (keys in predictionsObject.predictions) {
        const matchNumber = keys.substr(0, keys.indexOf("-"));
        const teamName =
          keys[keys.length - 1] === "h" ? "homeTeam" : "awayTeam";

        if (allPredictions.hasOwnProperty(matchNumber)) {
          let added = false;
          for (let j = 0; j < allPredictions[matchNumber].length; j++) {
            let prediction = allPredictions[matchNumber][j];

            if (prediction.userId === predictionsObject.userId) {
              allPredictions[matchNumber][j] = {
                ...prediction,
                [teamName]: keys.split("-")[2],
                [`${teamName}Score`]: predictionsObject.predictions[keys],
              };
              added = true;
              continue;
            } else if (j === allPredictions[matchNumber].length - 1 && !added) {
              allPredictions[matchNumber].push({
                userId: predictionsObject.userId,
                [teamName]: keys.split("-")[2],
                [`${teamName}Score`]: predictionsObject.predictions[keys],
                gameweek: predictionsObject.gameweek,
              });
              added = false;
            }
          }
        } else {
          allPredictions[matchNumber] = [
            {
              userId: predictionsObject.userId,
              [teamName]: keys.split("-")[2],
              [`${teamName}Score`]: predictionsObject.predictions[keys],
              gameweek: predictionsObject.gameweek,
            },
          ];
        }
      }
    });

    res.status(200).send(allPredictions);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get("/:userId/:gameweek", authenticate, async (req, res) => {
  const { userId, gameweek } = req.params;
  try {
    const predictions = await Prediction.findOne({ userId, gameweek });

    res.status(200).send(predictions);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
