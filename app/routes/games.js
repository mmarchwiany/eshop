const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Price = require("../models/price");
const pagination = require("./middleware/pagination");
const filters = require("./middleware/filters");
const order = require("./middleware/order");

router.get("/", [pagination, filters, order], async (req, res) => {
  try {
    const games = await Game.find(res.filters)
      .sort(res.order)
      .skip(res.skip)
      .limit(res.page_size);

    const pages = Math.ceil(
      (await Game.countDocuments(res.filters)) / res.page_size
    );

    res.json({
      games,
      meta: { page: res.page, page_size: res.page_size, pages }
    });
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

async function getGame(req, res, next) {
  const game = await Game.findOne({ id: req.params.id });

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  res.game = game;

  next();
}

module.exports = router;
