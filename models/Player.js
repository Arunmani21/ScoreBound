const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  availablity: {
    type: Boolean,
    required: true,
    default: true,
  },
  photo: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Batsman", "Bowler", "All-Rounder"],
    default: "Batsman",
  },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
