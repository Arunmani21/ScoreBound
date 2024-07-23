const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Player = require("../models/Player");

const createPlayer = async (req, res) => {
  try {
    const { playerName, availablity, photo, role } = req.body;

    if (!playerName || !availablity || !photo || !role) {
      throw new BadRequestError("Invalid Request. Missing required feilds");
    }

    const player = new Player({
      playerName,
      availablity,
      photo,
      role,
    });

    await player.save();

    res.status(StatusCodes.CREATED).json({
      msg: "Player added Successfully",
      data: player,
    });
  } catch (error) {
    throw new BadRequestError("Failed to add a player" + error.message);
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(StatusCodes.OK).json({
      msg: "Players listed Successfully",
      players,
    });
  } catch (error) {
    throw new BadRequestError("Failed to list the players" + error.message);
  }
};

const editPlayer = async (req, res) => {
  const playerId = req.params.id;
  try {
    const existPlayer = await Player.findById(playerId);

    if (!existPlayer) {
      throw new BadRequestError("Player Not found");
    }

    let { availablity, photo, role } = req.body;

    const updateInfo = await Player.findByIdAndUpdate(
      playerId,
      {
        availablity,
        photo,
        role,
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      msg: "Player Info Updated Successfully",
      updateInfo,
    });
  } catch (error) {
    throw new BadRequestError(
      "Failed to Update the Player Info" + error.message
    );
  }
};

const getPlayer = async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await Player.findById(playerId);
    res.status(StatusCodes.OK).json({
      msg: "Player Listed Successfully",
      player,
    });
  } catch (error) {
    throw new BadRequestError("Failed to list the player" + error.message);
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
  editPlayer,
  getPlayer,
};
