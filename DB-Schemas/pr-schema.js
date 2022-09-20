const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  Stats: {
    Benchpress: {
      type: Number,
    },
    Legpress: {
      type: Number,
    },
    Squads: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("PR-Stats", schema);
