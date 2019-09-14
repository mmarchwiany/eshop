const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Price = require("../models/price");

router.get("/", pagination, async (req, res) => {
  try {
    let filters = {};

    if (req.query.filters) {
      for (const key of Object.keys(req.query.filters)) {
        filters[key] = new RegExp(req.query.filters[key], "i");
      }
    }
    const games = await Game.find(filters)
      .skip(res.skip)
      .limit(res.page_size);

    res.json({ games, meta: { page: res.page, page_size: res.page_size } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getGame, async (req, res) => {
  try {
    res.json(res.game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/prices", getGame, async (req, res) => {
  try {
    const prices = await Price.find({ game_id: req.params.id });

    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/prices/:country", getGame, async (req, res) => {
  try {
    const prices = await Price.find({
      game_id: req.params.id,
      country: req.params.country
    });

    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function pagination(req, res, next) {
  const { page: page = 0, page_size = 10 } = req.query;
  const skip = page * page_size;

  if (page < 0) {
    return res.status(401).json({ message: "Page has to be grater the 0" });
  }
  if (page_size < 0) {
    return res
      .status(401)
      .json({ message: "Page size has to be grater the 0" });
  }

  res.page_size = parseInt(page_size);
  res.page = parseInt(page);
  res.skip = skip;

  next();
}

async function getGame(req, res, next) {
  const game = await Game.findOne({ id: req.params.id });

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  res.game = game;

  next();
}

module.exports = router;
