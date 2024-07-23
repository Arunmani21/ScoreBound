const express = require("express");
const router = express.Router();
const {
  createPlayer,
  getAllPlayers,
  getPlayer,
  editPlayer,
} = require("../controllers/player");

router.post("/create", createPlayer);
router.get("/players", getAllPlayers);
router.patch("/edit", editPlayer);
router.get("players/:id", getPlayer);

module.exports = router;
