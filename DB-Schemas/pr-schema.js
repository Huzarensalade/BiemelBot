const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  Benchpress: {
    type: Number,
  },
  Deadlift: {
    type: Number,
  },
  LatPulldown: {
    type: Number,
  },
  Legpress: {
    type: Number,
  },
  PullUp: {
    type: Number,
  },
  Squads: {
    type: Number,
  },
});

module.exports = mongoose.model("PR-Stats", schema);
