require("dotenv").config();
const express = require("express");
const router = express.Router();

const Prediction = require("../../models/Prediction");
const authenticate = require("../../middlewares/authenticate");

router.post("/", authenticate, async (req, res) => {
  const { userId, gameweek, predictions } = req.body;
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get("/:gameweek", authenticate, async (req, res) => {
  const { gameweek } = req.params;
  try {
    let allPredictions = {};
    const predictions = await Prediction.find({ gameweek });

    predictions.map((predictionsObject) => {
      for (keys in predictionsObject.predictions) {
        const matchNumber = keys.substr(0, keys.indexOf("-"));
        const teamName =
          keys[keys.length - 1] === "h" ? "homeTeam" : "awayTeam";

        if (allPredictions.hasOwnProperty(matchNumber)) {
          for (let j = 0; j < allPredictions[matchNumber].length; j++) {
            let prediction = allPredictions[matchNumber][j];

            if (prediction.userId === predictionsObject.userId) {
              allPredictions[matchNumber][j] = {
                ...prediction,
                [teamName]: keys.split("-")[2],
                [`${teamName}Score`]: predictionsObject.predictions[keys],
              };
            }
          }
        } else {
          allPredictions[matchNumber] = [
            {
              userId: predictionsObject.userId,
              [teamName]: keys.split("-")[2],
              [`${teamName}Score`]: predictionsObject.predictions[keys],
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
