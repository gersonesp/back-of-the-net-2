require("dotenv").config();
const express = require("express");
const router = express.Router();

const Prediction = require("../../models/Prediction");

router.post("/", async (req, res) => {
  const { userId, gameweek, predictions } = req.body;
  try {
    const prediction = await Prediction.findOne({ gameweek });

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

router.get("/", async (req, res) => {
  try {
    const predictions = await Prediction.find();

    res.status(200).send(predictions);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get("/:userId/:gameweek", async (req, res) => {
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
