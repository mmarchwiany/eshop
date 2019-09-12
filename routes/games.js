const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Price = require("../models/price");

const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan,
  getPrices
} = require("nintendo-switch-eshop");

router.get("/", async (req, res) => {
  try {
    const games = await Game.find().limit(10);

    res.json(games);
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

router.post("/import", async (req, res) => {
  getGamesEurope()
    .then(async data => {
      for (let {
        nsuid_txt: id,
        title: title,
        image_url: image,
        game_categories_txt: categories,
        price_has_discount_b: is_discounted,
        price_discount_percentage_f: discount
      } of data) {
        if (id === undefined) {
          continue;
        }

        const game = new Game({
          id: id[0],
          title,
          image,
          categories,
          is_discounted,
          discount
        });

        try {
          await game.save();
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }

      res.status(200).json({ save: "OK" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
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
