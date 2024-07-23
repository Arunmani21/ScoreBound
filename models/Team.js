const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  availabilty: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    enum: ["captain", "player"],
    default: "captain",
  },
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
