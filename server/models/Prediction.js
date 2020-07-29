const mongoose = require("mongoose");
const { Schema } = mongoose;

const PredictionSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  gameweek: {
    type: String,
    required: true,
  },
  predictions: {
    type: Object,
    required: true,
  },
});

const Prediction = mongoose.model("predictions", PredictionSchema);
module.exports = Prediction;
